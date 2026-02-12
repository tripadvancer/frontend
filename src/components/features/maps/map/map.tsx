'use client'

import { RefObject, useCallback, useRef } from 'react'
import { AttributionControl, MapRef, Marker, Map as ReactMapGl } from 'react-map-gl/maplibre'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

import { MapControl } from '@/components/ui/map-control'
import { getMapViewState } from '@/utils/redux/features/map-slice'
import { useAppSelector } from '@/utils/redux/hooks'

import 'maplibre-gl/dist/maplibre-gl.css'

import { MapControlUserLocation } from './components/map-control-user-location'
import { MapPinUser } from './components/map-pin-user'
import { MapPopupLocation } from './components/map-popup-location'
import { MapPopupPlace } from './components/map-popup-place'
import { useMapEventHandlers } from './map-event-handlers'
import { placesLayer } from './sources/map-layers'
import { MapSources } from './sources/map-sources'

type MapProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const Map = ({ activeUserId, isAuth, isEmailVerified }: MapProps) => {
    const handlers = useMapEventHandlers()
    const mapViewState = useAppSelector(getMapViewState)
    const isMobile = useMediaQuery('(max-width: 639px)')
    const isTablet = useMediaQuery('(max-width: 1023px)')

    const mapRef = useRef<MapRef>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    return (
        <div ref={containerRef} className="size-full">
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
                <MapSources isAuth={isAuth} />

                <div className="absolute right-2 top-20 z-30 flex flex-col gap-y-1 sm:bottom-auto sm:left-2 sm:right-auto sm:top-2 sm:translate-y-0">
                    <MapControl onClick={handleZoomIn}>
                        <PlusIcon size={16} />
                    </MapControl>

                    <MapControl onClick={handleZoomOut}>
                        <MinusIcon size={16} />
                    </MapControl>

                    <MapControlUserLocation />
                </div>

                <MapPinUser />
                <MapPopupPlace containerRef={containerRef as RefObject<HTMLDivElement>} />
                <MapPopupLocation
                    containerRef={containerRef as RefObject<HTMLDivElement>}
                    activeUserId={activeUserId}
                    isAuth={isAuth}
                    isEmailVerified={isEmailVerified}
                />

                {!isMobile && <AttributionControl compact={true} />}
            </ReactMapGl>
        </div>
    )
}
