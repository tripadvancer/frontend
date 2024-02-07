'use client'

import { MapProvider } from 'react-map-gl/maplibre'

import { Mapbox } from './components/map/mapbox'
import { Widget } from './components/widget/widget'

export const Maps = () => {
    return (
        <MapProvider>
            <Widget />
            <Mapbox />
        </MapProvider>
    )
}
