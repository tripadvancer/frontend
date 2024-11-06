'use client'

import { useCallback } from 'react'
import { useGeolocated } from 'react-geolocated'
import { useMap } from 'react-map-gl/maplibre'

import { useTranslations } from 'next-intl'

import { useToast } from '@/providers/toast-provider'
import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'
import { getMapFlyToOptions } from '@/utils/helpers/maps'

import { WidgetMessage } from '../widget-message'
import { WidgetRandomPlace } from './widget-random-place'

type WidgetRandomResultsProps = {
    place:
        | {
              id: number
              title: string
              description: string
              cover: string | null
              avgRating: number | null
              reviewsCount: number
              countryCode: string | null
              isSaved: boolean
              coordinates: number[]
          }
        | undefined
    isSuccess: boolean
    isError: boolean
    isUserLocated: boolean
}

export const WidgetRandomResults = ({ place, isSuccess, isError, isUserLocated }: WidgetRandomResultsProps) => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const toast = useToast()

    const { map } = useMap()

    const { getPosition, coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
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
        if (!isGeolocationAvailable) {
            toast.error(t('geolocation.isNotSupported'))
            return
        }

        if (!isGeolocationEnabled) {
            toast.error(t('geolocation.isNotEnabled'))
            return
        }

        if (coords) {
            const userLngLat = { lng: coords?.longitude, lat: coords?.latitude }
            map?.flyTo(getMapFlyToOptions(userLngLat))
            return
        }
    }

    if (isError) {
        return <WidgetMessage />
    }

    if (!isUserLocated) {
        return (
            <WidgetMessage
                message={t('map.widget.random.notLocation')}
                actionCaption={t('common.action.locateMe')}
                onAction={handleLocate}
            />
        )
    }

    if (isSuccess && !place) {
        return (
            <div className="m-auto text-center text-black-40">
                {t.rich('map.widget.random.emptyMessage', { br: () => <br /> })}
            </div>
        )
    }

    if (isSuccess && place) {
        return <WidgetRandomPlace {...place} />
    }

    return null
}
