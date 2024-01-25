import { useState } from 'react'
import { Layer, Map, Source, ViewState } from 'react-map-gl'

import { placesLayer } from '../_utils/layers'
import { useMapEventHandlers } from './map-event-handlers'

import 'mapbox-gl/dist/mapbox-gl.css'

export const MapMapbox = () => {
    const [viewState, setViewState] = useState<ViewState>({
        latitude: 54.887928,
        longitude: 25.954196,
        zoom: 5,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
    })

    // const handlers = useMapEventHandlers(viewState, setViewState)

    return (
        <Map
            id="map"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            interactiveLayerIds={[placesLayer.id]}
            reuseMaps
            {...viewState}
            // {...handlers}
        >
            <Source id="places-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
                {/* <Layer {...placesLayer} /> */}
            </Source>
        </Map>
    )
}
