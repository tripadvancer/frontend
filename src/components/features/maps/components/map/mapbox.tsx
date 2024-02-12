'use client'

import { Layer, Map as ReactMapGl, Source } from 'react-map-gl'

import { getMapDataSource } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'
import { MapDataSourcesEnum } from '@/utils/enums'

import { LocationPopup } from './components/location-popup'
import { PlacePopup } from './components/place-popup'
import { favoritesPlacesLayer, placesLayer, visitedPlacesLayer } from './layers'
import { useMapEventHandlers } from './map-event-handlers'

import 'maplibre-gl/dist/maplibre-gl.css'

export const Mapbox = () => {
    const handlers = useMapEventHandlers()
    const mapDataSource = useAppSelector(getMapDataSource)

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
                {mapDataSource === MapDataSourcesEnum.ALL_PLACES && <Layer {...placesLayer} />}
                {mapDataSource === MapDataSourcesEnum.FAVORITES_PLACES && <Layer {...favoritesPlacesLayer} />}
                {mapDataSource === MapDataSourcesEnum.VISITED_PLACES && <Layer {...visitedPlacesLayer} />}
            </Source>

            {handlers.placePopupInfo && <PlacePopup {...handlers.placePopupInfo} />}
            {handlers.locationPopupInfo && <LocationPopup {...handlers.locationPopupInfo} />}
        </ReactMapGl>
    )
}
