import { useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import { useMap } from 'react-map-gl/maplibre'

import { useTranslations } from 'next-intl'

import { useToast } from '@/providers/toast-provider'
import { getUserLocation, setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getMapFlyToOptions } from '@/utils/helpers/maps'

interface useUserLocationInterface {
    isGeolocationEnabled: boolean
    handleLocate: () => void
}

export function useUserLocation(): useUserLocationInterface {
    const t = useTranslations()
    const toast = useToast()
    const userLocation = useAppSelector(getUserLocation)
    const dispatch = useAppDispatch()

    const { map } = useMap()

    const { isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true, // Request the most accurate position available (e.g., GPS)
            maximumAge: 0, // Do not use cached position data, always get fresh data
            timeout: Infinity, // Wait indefinitely for the position, no timeout
        },
        watchPosition: true, // Do not watch for position changes
        userDecisionTimeout: 0, // Do not wait for the user's decision
        suppressLocationOnMount: false, // Get the location when the hook mounts
        isOptimisticGeolocationEnabled: false, // Do not use optimistic geolocation
        watchLocationPermissionChange: false, // Do not watch for changes in location permission
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

    const handleLocate = () => {
        if (userLocation) {
            map?.flyTo(getMapFlyToOptions(userLocation))
            return
        }

        if (!isGeolocationAvailable) {
            toast.error(t('geolocation.isNotSupported'))
            return
        }

        if (!isGeolocationEnabled) {
            toast.error(t('geolocation.isNotEnabled'))
            return
        }
    }

    return { isGeolocationEnabled, handleLocate }
}
