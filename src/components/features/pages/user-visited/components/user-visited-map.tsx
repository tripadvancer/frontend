'use client'

import { useCallback, useMemo, useRef } from 'react'
import { MapEvent, MapRef, Map as ReactMapGl } from 'react-map-gl/maplibre'

import { MinusIcon, PlusIcon } from 'lucide-react'

import { MapControl } from '@/components/ui/map-control'
import { IUserVisitedCountries } from '@/utils/types/user'

type UserVisitedMapProps = {
    visitedCountries: IUserVisitedCountries
}

export const UserVisitedMap = ({ visitedCountries }: UserVisitedMapProps) => {
    const visitedLength = visitedCountries.length

    const visited = useMemo(() => {
        return visitedLength === 0 ? [''] : visitedCountries.map(item => item.code)
    }, [visitedCountries, visitedLength])

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
                    'fill-outline-color': '#46a6ff',
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
                        <PlusIcon size={16} />
                    </MapControl>

                    <MapControl onClick={handleZoomOut}>
                        <MinusIcon size={16} />
                    </MapControl>
                </div>
            </ReactMapGl>
        </div>
    )
}
