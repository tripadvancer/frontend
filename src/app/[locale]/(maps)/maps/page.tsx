'use client'

import { MapProvider } from 'react-map-gl'

import { Map } from './_components/map'
import { Widget } from './_components/widget'

export default function MapsPage() {
    return (
        <MapProvider>
            <Widget />
            <Map />
        </MapProvider>
    )
}
