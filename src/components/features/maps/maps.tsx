'use client'

import { MapProvider } from 'react-map-gl'

import { Map } from './components/map/map'

export const Maps = () => {
    return (
        <MapProvider>
            <Map />
        </MapProvider>
    )
}
