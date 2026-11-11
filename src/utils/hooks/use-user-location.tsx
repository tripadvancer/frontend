import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { useToast } from '@/components/providers/toast-provider'
import { getMapFlyToOptions } from '@/utils/helpers/maps'
import { getUserLocation, setUserLocation } from '@/utils/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

interface useUserLocationInterface {
    isLocating: boolean
    isWatching: boolean
    isDenied: boolean
    handleLocate: () => void
}

interface LngLat {
    lng: number
    lat: number
}

export function useUserLocation(): useUserLocationInterface {
    const toast = useToast()
    const userLocation = useAppSelector(getUserLocation)
    const dispatch = useAppDispatch()

    const [isLocating, setIsLocating] = useState(false)
    const [isWatching, setIsWatching] = useState(false)
    const [isDenied, setIsDenied] = useState(false)

    const { map } = useMap()

    useEffect(() => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser.')
            return
        }

        setIsLocating(true)

        const handleSuccess = (position: GeolocationPosition) => {
            const userLngLat: LngLat = {
                lng: position.coords.longitude,
                lat: position.coords.latitude,
            }
            dispatch(setUserLocation(userLngLat))
            setIsLocating(false)
            setIsWatching(true)
        }

        const handleError = (error: GeolocationPositionError) => {
            if (error.code === error.PERMISSION_DENIED) {
                setIsDenied(true)
            }
            setIsLocating(false)
        }

        const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
            enableHighAccuracy: true,
            timeout: 7000,
            maximumAge: 0,
        })

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }
    }, [dispatch, toast])

    const handleLocate = () => {
        if (isDenied) {
            toast.error('You have denied access to geolocation. Please enable it in settings.')
            return
        }

        if (userLocation) {
            map?.flyTo(getMapFlyToOptions(userLocation))
        }
    }

    return {
        isLocating,
        isWatching,
        isDenied,
        handleLocate,
    }
}
