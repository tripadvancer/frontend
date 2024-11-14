'use client'

import { useCallback, useRef } from 'react'
import { AttributionControl, MapRef, Map as ReactMapGl } from 'react-map-gl/maplibre'

import { useMediaQuery } from 'usehooks-ts'

import { MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'
import { getMapViewState } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'

import 'maplibre-gl/dist/maplibre-gl.css'

import { MapControlCostingModel } from './components/map-control-costing-model'
import { MapControlUserLocation } from './components/map-control-user-location'
import { MapPinUser } from './components/map-pin-user'
import { MapPopupLocation } from './components/map-popup-location'
import { MapPopupPlace } from './components/map-popup-place'
import { MapPopupRoute } from './components/map-popup-route'
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

                <div className="absolute right-2 top-20 z-30 flex flex-col items-end gap-y-1 sm:bottom-auto sm:left-2 sm:right-auto sm:top-2 sm:translate-y-0 sm:items-start">
                    <MapControl onClick={handleZoomIn}>
                        <PlusIcon16 />
                    </MapControl>

                    <MapControl onClick={handleZoomOut}>
                        <MinusIcon16 />
                    </MapControl>

                    <MapControlUserLocation />
                    <MapControlCostingModel />
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
