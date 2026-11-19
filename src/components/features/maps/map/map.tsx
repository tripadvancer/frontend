'use client'

import { RefObject, useCallback, useRef } from 'react'
import { AttributionControl, MapRef, Marker, Map as ReactMapGl } from 'react-map-gl/maplibre'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

import { useAppSettings } from '@/components/providers/settings-provider'
import { MapControl } from '@/components/ui/map-control'
import { transformMapRequest } from '@/utils/helpers/map-request'
import { getDefaultViewState } from '@/utils/helpers/maps'
import { getMapViewState } from '@/utils/redux/features/map-slice'
import { useAppSelector } from '@/utils/redux/hooks'

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
    const settings = useAppSettings()
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

    if (!settings) {
        return null
    }

    return (
        <div ref={containerRef} className="size-full">
            <ReactMapGl
                id="map"
                ref={mapRef}
                mapStyle="https://tiles.openfreemap.org/styles/bright"
                transformRequest={transformMapRequest}
                interactiveLayerIds={[placesLayer.id]}
                attributionControl={false}
                reuseMaps
                initialViewState={{
                    ...getDefaultViewState(settings.map),
                    ...mapViewState,
                    padding:
                        isMobile || isTablet
                            ? { top: 106, right: 50, bottom: 50, left: 50 }
                            : { top: 100, right: 564, bottom: 100, left: 100 },
                }}
                {...handlers}
            >
                <MapSources isAuth={isAuth} />

                <div className="absolute top-20 right-2 z-30 flex flex-col gap-y-1 sm:top-2 sm:right-auto sm:bottom-auto sm:left-2 sm:translate-y-0">
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

                <AttributionControl compact={true} position="bottom-left" />
            </ReactMapGl>
        </div>
    )
}
