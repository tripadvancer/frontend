<<<<<<< Updated upstream
import { useState } from 'react'
=======
import { useGeolocated } from 'react-geolocated'
>>>>>>> Stashed changes
import { useMap } from 'react-map-gl/maplibre'

import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'
import { getMapFlyToOptions } from '@/utils/helpers/maps'

interface useUserLocationInterface {
    isLocating: boolean
    handleLocate: () => void
}

export function useUserLocation(): useUserLocationInterface {
    const dispatch = useAppDispatch()
    const [isLocating, setIsLocating] = useState(false)

    const { map } = useMap()

<<<<<<< Updated upstream
=======
    const { isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity,
        },
        watchPosition: true,
        userDecisionTimeout: 0,
        suppressLocationOnMount: false,
        isOptimisticGeolocationEnabled: false,
        watchLocationPermissionChange: false,
        onSuccess: (position: GeolocationPosition) => {
            const userLngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
            dispatch(setUserLocation(userLngLat))
        },
        onError: error => {
            if (error && error.code === error.PERMISSION_DENIED) {
                // toast.error(t('geolocation.isNotPermission'))
            } else {
                toast.error(t('common.error'))
            }
        },
    })

>>>>>>> Stashed changes
    const handleLocate = () => {
        if ('geolocation' in navigator) {
            setIsLocating(true)
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                const lngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
                map?.flyTo(getMapFlyToOptions(lngLat))
                dispatch(setUserLocation(lngLat))
                setIsLocating(false)
            })
        }
    }

    return { isLocating, handleLocate }
}
