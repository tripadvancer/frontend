'use client'

import { useCallback, useRef } from 'react'
import { MapEvent, MapRef, Map as ReactMapGl } from 'react-map-gl/maplibre'

import type { IUserVisitedCountries } from '@/utils/types/user'

import { MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'

type UserVisitedMapProps = {
    visitedCountries: IUserVisitedCountries
}

export const UserVisitedMap = ({ visitedCountries }: UserVisitedMapProps) => {
    const visitedLength = visitedCountries.length
    const visited = visitedLength === 0 ? [''] : visitedCountries.map(item => item.code)

    const mapRef = useRef<MapRef>(null)

    const handleLoad = useCallback(
        (event: MapEvent) => {
            const map = event.target

            // Add MapTiler Countries dataset
            map.addSource('statesData', {
                type: 'vector',
                url: 'https://api.maptiler.com/tiles/countries/tiles.json?key=tuD8Imv3CRrCnq99JOJo',
            })

            // Styling for countries layer with linear interpolation of data
            map.addLayer({
                id: 'countries',
                source: 'statesData',
                'source-layer': 'administrative',
                type: 'fill',
                paint: {
                    'fill-color': ['match', ['get', 'iso_a2'], visited, '#ff9733', '#fff2e6'],
                    'fill-opacity': 1,
                    'fill-outline-color': '#000',
                },
            })
        },
        [visited],
    )

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    return (
        <div className="relative h-[480px] rounded-2xl bg-blue-80 fill-black-40 p-4">
            <ReactMapGl
                id="user-map"
                ref={mapRef}
                style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
                maxZoom={1.9}
                minZoom={0}
                initialViewState={{
                    longitude: 10,
                    latitude: 50,
                    zoom: 0.01,
                }}
                attributionControl={false}
                renderWorldCopies={false}
                scrollZoom={false}
                onLoad={handleLoad}
            >
                <div className="absolute right-2 top-2 z-30 flex flex-col gap-y-1">
                    <MapControl onClick={handleZoomIn}>
                        <PlusIcon16 />
                    </MapControl>

                    <MapControl onClick={handleZoomOut}>
                        <MinusIcon16 />
                    </MapControl>
                </div>
            </ReactMapGl>
        </div>
    )
}
