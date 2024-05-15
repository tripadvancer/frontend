'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { routeLayer } from './map-layers'

export const MapSourceRoute = () => {
    return (
        <Source id="route-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
            <Layer {...routeLayer} />
        </Source>
    )
}
