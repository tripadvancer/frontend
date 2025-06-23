'use client'

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { AttributionControl, MapLayerMouseEvent, MapRef, Map as ReactMapGl, ViewState } from 'react-map-gl/maplibre'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

import { useSearchParams } from 'next/navigation'

import { MapControl } from '@/components/ui/map-control'
import { useDialog } from '@/providers/dialog-provider'

import 'maplibre-gl/dist/maplibre-gl.css'

import { PlacePreview } from '../../dialogs/place-preview/place-preview'
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
    const isMobile = useMediaQuery('(max-width: 639px)')
    const searchParams = useSearchParams()
    const dialog = useDialog()

    const mapRef = useRef<MapRef>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [initialViewState, setInitialViewState] = useState<ViewState | undefined>(undefined)

    useEffect(() => {
        const lat = parseFloat(searchParams.get('lat') || '')
        const lng = parseFloat(searchParams.get('lng') || '')
        const zoom = parseFloat(searchParams.get('zoom') || '')

        if (!isNaN(lat) && !isNaN(lng) && !isNaN(zoom)) {
            setInitialViewState({
                latitude: lat,
                longitude: lng,
                zoom,
                bearing: 0,
                pitch: 0,
                padding: { top: 0, right: 0, bottom: 0, left: 0 },
            })
        }
    }, [searchParams])

    useEffect(() => {
        console.log(initialViewState)
    }, [initialViewState])

    const handleZoom = useCallback((direction: 'in' | 'out') => {
        const method = direction === 'in' ? 'zoomIn' : 'zoomOut'
        mapRef.current?.[method]?.({ duration: 500 })
    }, [])

    const handleClick = useCallback(
        (event: MapLayerMouseEvent) => {
            if (event.features) {
                const feature = event.features[0]
                if (feature) {
                    dialog.open(<PlacePreview />)

                    // // @ts-ignore
                    // const coordinates = feature.geometry.coordinates.slice()
                    // while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                    //     coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360
                    // }
                    // const place = { ...feature.properties, coordinates } as {
                    //     id: number
                    //     title: string
                    //     cover: string | null
                    //     avgRating: number | null
                    //     reviewsCount: number
                    //     isSaved: boolean
                    //     coordinates: number[]
                    // }
                    // dispatch(setMapPlacePopupInfo(place))
                } else {
                    // if (mapState.placePopupInfo || mapState.locationPopupInfo) {
                    //     dispatch(closeMapPopups())
                    //     return
                    // }
                    // showLocationPopup(event.lngLat.wrap())
                }
            }

            event.originalEvent.stopPropagation()
        },
        [dialog],
    )

    if (!initialViewState) {
        return null
    }

    return (
        <div ref={containerRef} className="size-full">
            {/* todo: for debug, remove later */}
            <div className="fixed left-0 right-0 top-1/2 z-50 h-[1px] bg-red-100"></div>
            <div className="fixed bottom-0 left-1/2 top-0 z-50 w-[1px] bg-red-100"></div>

            <ReactMapGl
                id="map"
                ref={mapRef}
                mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
                interactiveLayerIds={[placesLayer.id]}
                attributionControl={false}
                reuseMaps
                initialViewState={initialViewState}
                onClick={handleClick}
                {...handlers}
            >
                <MapSources isAuth={isAuth} />

                <div className="absolute right-2 top-20 z-30 flex flex-col gap-y-1 sm:bottom-auto sm:left-2 sm:right-auto sm:top-2 sm:translate-y-0">
                    <MapControl onClick={() => handleZoom('in')}>
                        <PlusIcon size={16} />
                    </MapControl>

                    <MapControl onClick={() => handleZoom('out')}>
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
