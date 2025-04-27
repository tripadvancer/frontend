import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { useTranslations } from 'next-intl'

import { useToast } from '@/providers/toast-provider'
import { getUserLocation, setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getMapFlyToOptions } from '@/utils/helpers/maps'

interface useUserLocationInterface {
    isLocating: boolean
    isWatching: boolean
    isDenied: boolean
    handleLocate: () => void
}

export function useUserLocation(): useUserLocationInterface {
    const t = useTranslations()
    const toast = useToast()
    const userLocation = useAppSelector(getUserLocation)
    const dispatch = useAppDispatch()

    const [isLocating, setIsLocating] = useState(false)
    const [isWatching, setIsWatching] = useState(false)
    const [isDenied, setIsDenied] = useState(false)

    const { map } = useMap()

    useEffect(() => {
        setIsLocating(true)

        if (!navigator.geolocation) {
            setIsLocating(false)
            toast.error(t('geolocation.isNotSupported'))
            return
        }

        const watchId = navigator.geolocation.watchPosition(
            position => {
                const userLngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
                dispatch(setUserLocation(userLngLat))
                setIsLocating(false)
                setIsWatching(true)
            },
            error => {
                if (error.code === error.PERMISSION_DENIED) {
                    setIsDenied(true)
                } else {
                    console.error('Error getting location:', error)
                    toast.error(t('common.error'))
                }
                setIsLocating(false)
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            },
        )

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }
    }, [dispatch, toast, t])

    const handleLocate = () => {
        if (isDenied) {
            toast.error(t('geolocation.isNotPermission'))
            return
        }

        if (userLocation) {
            map?.flyTo(getMapFlyToOptions(userLocation))
            return
        }
    }

    return { isLocating, isWatching, isDenied, handleLocate }
}
