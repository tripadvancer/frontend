'use client'

import { Layer, Map as ReactMapGl, Source } from 'react-map-gl/maplibre'

import { placesLayer } from './layers'
import { useMapEventHandlers } from './map-event-handlers'

import 'maplibre-gl/dist/maplibre-gl.css'

export const Map = () => {
    const handlers = useMapEventHandlers()

    return (
        <ReactMapGl id="mainMap" interactiveLayerIds={[placesLayer.id]} {...handlers} reuseMaps>
            <Source
                id="osm"
                type="raster"
                tiles={['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png']}
                tileSize={256}
                attribution="&copy; OpenStreetMap Contributors"
                maxzoom={19}
            >
                <Layer id="osm" type="raster" source="osm" />
            </Source>
            <Source id="places-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
                <Layer {...placesLayer} />
            </Source>
        </ReactMapGl>
    )
}
