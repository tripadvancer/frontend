'use client'

import { MapProvider } from 'react-map-gl'

import { MapMapbox } from './_components/map-mapbox'
import { MapOSM } from './_components/map-osm'
import { Widget } from './_components/widget'

export default function MapsPage() {
    const mapSource = process.env.NEXT_PUBLIC_MAP_SOURCE

    return (
        <MapProvider>
            <Widget />
            <div className="h-screen w-screen">
                {mapSource === 'osm' && <MapOSM />}
                {mapSource === 'mapbox' && <MapMapbox />}
            </div>
        </MapProvider>
    )
}
