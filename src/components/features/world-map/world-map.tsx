'use client'

import { useCallback } from 'react'
import { MapEvent, Map as ReactMapGl } from 'react-map-gl/maplibre'

export const WorldMap = ({ visited }: { visited: string[] }) => {
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

    return (
        <div className="relative h-[480px] rounded-2xl bg-blue-80 fill-black-40 p-4">
            <ReactMapGl
                id="map"
                attributionControl={false}
                style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
                maxZoom={1.9}
                minZoom={0}
                renderWorldCopies={false}
                reuseMaps
                initialViewState={{
                    longitude: 10,
                    latitude: 50,
                    zoom: 0.01,
                }}
                onLoad={handleLoad}
            />
        </div>
    )
}
