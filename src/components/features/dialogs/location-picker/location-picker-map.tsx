'use client'

import { useCallback, useRef, useState } from 'react'
import { MapRef, Map as ReactMapGl, ViewState, ViewStateChangeEvent } from 'react-map-gl/maplibre'

import { LocationIcon16, MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'
import { getFlyToViewState } from '@/utils/helpers/maps'
import { LngLat } from '@/utils/types/geo'

type LocationPickerMapProps = {
    viewState: Partial<ViewState>
    onMove: (viewState: Partial<ViewState>) => void
    onMoveStart: () => void
    onMoveEnd: () => void
}

export const LocationPickerMap = ({ viewState, onMove, onMoveStart, onMoveEnd }: LocationPickerMapProps) => {
    const mapRef = useRef<MapRef>(null)
    const [isUserLocating, setIsUserLocating] = useState<boolean>(false)

    const handleUserLocate = () => {
        if ('geolocation' in navigator) {
            setIsUserLocating(true)
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                const lngLat: LngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
                onMove(getFlyToViewState(lngLat))
                setIsUserLocating(false)
            })
        }
    }

    const handleMapMove = useCallback(
        (event: ViewStateChangeEvent) => {
            onMove(event.viewState)
        },
        [onMove],
    )

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    return (
        <ReactMapGl
            {...viewState}
            ref={mapRef}
            mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
            attributionControl={false}
            onMove={handleMapMove}
            onMoveStart={onMoveStart}
            onMoveEnd={onMoveEnd}
        >
            <div className="absolute bottom-2 right-2 flex flex-col gap-y-1">
                <MapControl desktopOnly onClick={handleZoomIn}>
                    <PlusIcon16 />
                </MapControl>

                <MapControl desktopOnly onClick={handleZoomOut}>
                    <MinusIcon16 />
                </MapControl>

                <MapControl isLoading={isUserLocating} onClick={handleUserLocate}>
                    <LocationIcon16 />
                </MapControl>
            </div>
        </ReactMapGl>
    )
}
