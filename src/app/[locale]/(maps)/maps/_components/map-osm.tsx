import { Map } from 'react-map-gl/maplibre'

import { useMapEventHandlers } from './map-event-handlers'

import 'maplibre-gl/dist/maplibre-gl.css'

export const MapOSM = () => {
    const handlers = useMapEventHandlers()

    return (
        <Map
            id="mainMap"
            mapStyle={{
                version: 8,
                sources: {
                    osm: {
                        type: 'raster',
                        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                        tileSize: 256,
                        attribution: '&copy; OpenStreetMap Contributors',
                        maxzoom: 19,
                    },
                },
                layers: [
                    {
                        id: 'osm',
                        type: 'raster',
                        source: 'osm', // This must match the source key above
                    },
                ],
            }}
            reuseMaps
            {...handlers}
        />
    )
}
