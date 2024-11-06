'use client'

import { useCallback, useRef } from 'react'
import { useGeolocated } from 'react-geolocated'
import { AttributionControl, MapRef, Map as ReactMapGl } from 'react-map-gl/maplibre'

import { useTranslations } from 'next-intl'
import { useMediaQuery } from 'usehooks-ts'

import { MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { LocationIcon } from '@/components/ui/location-icon'
import { MapControl } from '@/components/ui/map-control'
import { useToast } from '@/providers/toast-provider'
import { getMapViewState } from '@/redux/features/map-slice'
import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getMapFlyToOptions } from '@/utils/helpers/maps'

import 'maplibre-gl/dist/maplibre-gl.css'

import { MapPinUser } from './components/map-pin-user'
import { MapPopupLocation } from './components/map-popup-location'
import { MapPopupPlace } from './components/map-popup-place'
import { MapPopupRoute } from './components/map-popup-route'
import { MapSelectCostingModel } from './components/map-select-costing-model'
import { useMapEventHandlers } from './map-event-handlers'
import { placesLayer } from './sources/map-layers'
import { MapSourceRoute } from './sources/map-source-route'
import { MapSources } from './sources/map-sources'

type MapProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const Map = ({ activeUserId, isAuth, isEmailVerified }: MapProps) => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const toast = useToast()
    const handlers = useMapEventHandlers()
    const mapViewState = useAppSelector(getMapViewState)
    const isMobile = useMediaQuery('(max-width: 639px)')
    const isTablet = useMediaQuery('(max-width: 1023px)')

    const mapRef = useRef<MapRef>(null)
    const containerRef = useRef<HTMLDivElement>(null)

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
            mapRef.current?.flyTo(getMapFlyToOptions(userLngLat))
            return
        }
    }

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    return (
        <div ref={containerRef} className="size-full">
            <ReactMapGl
                id="map"
                ref={mapRef}
                mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
                interactiveLayerIds={[placesLayer.id]}
                attributionControl={false}
                reuseMaps
                initialViewState={{
                    ...mapViewState,
                    padding:
                        isMobile || isTablet
                            ? { top: 106, right: 50, bottom: 50, left: 50 }
                            : { top: 100, right: 564, bottom: 100, left: 100 },
                }}
                {...handlers}
            >
                <MapSourceRoute />
                <MapSources isAuth={isAuth} />

                <div className="absolute right-2 top-20 z-30 flex flex-col gap-y-1 sm:bottom-auto sm:left-2 sm:right-auto sm:top-2 sm:translate-y-0">
                    <MapControl onClick={handleZoomIn}>
                        <PlusIcon16 />
                    </MapControl>

                    <MapControl onClick={handleZoomOut}>
                        <MinusIcon16 />
                    </MapControl>

                    <MapControl onClick={handleLocate}>
                        <LocationIcon />
                    </MapControl>

                    <MapSelectCostingModel />
                </div>

                <MapPinUser />
                <MapPopupRoute />
                <MapPopupPlace containerRef={containerRef} />
                <MapPopupLocation
                    containerRef={containerRef}
                    activeUserId={activeUserId}
                    isAuth={isAuth}
                    isEmailVerified={isEmailVerified}
                />

                {!isMobile && <AttributionControl compact={true} />}
            </ReactMapGl>
        </div>
    )
}
