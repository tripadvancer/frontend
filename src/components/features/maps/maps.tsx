'use client'

import { MapProvider } from 'react-map-gl'

import { Map } from './components/map/map'
import { Widget } from './components/widget/widget'

export const Maps = () => {
    return (
        <MapProvider>
            <Widget />
            <Map />
        </MapProvider>
    )
}
