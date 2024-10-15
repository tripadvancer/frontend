'use client'

import { useCallback, useRef } from 'react'
import { AttributionControl, MapRef, Marker, Map as ReactMapGl } from 'react-map-gl/maplibre'

import { useMediaQuery } from 'usehooks-ts'

import { LocationIcon16, MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'
import { getMapViewState } from '@/redux/features/map-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { useUserLocation } from '@/utils/hooks/use-user-location'

import 'maplibre-gl/dist/maplibre-gl.css'

import { MapPinUser } from './components/map-pin-user'
import { MapPopupLocation } from './components/map-popup-location'
import { MapPopupPlace } from './components/map-popup-place'
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
    const handlers = useMapEventHandlers()
    const userLocation = useAppSelector(getUserLocation)
    const mapViewState = useAppSelector(getMapViewState)
    const isMobile = useMediaQuery('(max-width: 639px)')
    const isTablet = useMediaQuery('(max-width: 1023px)')

    const mapRef = useRef<MapRef>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    const { handleLocate, isLocating } = useUserLocation()

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    return (
        <div ref={mapContainerRef} className="size-full">
            {/* todo: for debug, remove later */}
            {/* <div className="fixed left-0 right-0 top-1/2 z-50 h-[1px] bg-red-100"></div> */}
            {/* <div className="fixed bottom-0 left-1/2 top-0 z-50 w-[1px] bg-red-100"></div> */}

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

                    <MapControl isLoading={isLocating} onClick={handleLocate}>
                        <LocationIcon16 />
                    </MapControl>
                </div>

                {userLocation && (
                    <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="bottom">
                        <MapPinUser />
                    </Marker>
                )}

                {handlers.placePopupInfo && <MapPopupPlace mapRef={mapContainerRef} place={handlers.placePopupInfo} />}

                {handlers.locationPopupInfo && (
                    <MapPopupLocation
                        mapRef={mapContainerRef}
                        activeUserId={activeUserId}
                        isAuth={isAuth}
                        isEmailVerified={isEmailVerified}
                        {...handlers.locationPopupInfo}
                    />
                )}

                {!isMobile && <AttributionControl compact={true} />}
            </ReactMapGl>
        </div>
    )
}
