'use client'

import { Layer, Map as ReactMapGl, Source } from 'react-map-gl/maplibre'

import { LocationPopup } from './components/location-popup'
import { PlacePopup } from './components/place-popup'
import { placesLayer } from './layers'
import { useMapEventHandlers } from './map-event-handlers'

import 'maplibre-gl/dist/maplibre-gl.css'

export const Mapbox = () => {
    const handlers = useMapEventHandlers()

    return (
        <ReactMapGl
            id="mainMap"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            interactiveLayerIds={[placesLayer.id]}
            reuseMaps
            {...handlers}
        >
            <Source id="places-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
                <Layer {...placesLayer} />
            </Source>

            {handlers.placePopupInfo && <PlacePopup {...handlers.placePopupInfo} />}
            {handlers.locationPopupInfo && <LocationPopup {...handlers.locationPopupInfo} />}
        </ReactMapGl>
    )
}
