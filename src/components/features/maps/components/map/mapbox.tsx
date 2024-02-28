'use client'

import { Layer, Map as ReactMapGl, Source } from 'react-map-gl'

import { getMapBounds, getMapDataSource, getWidgetSelectedCategories } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'
import { favoritesAPI } from '@/redux/services/favorites-api'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { MapDataSourcesEnum } from '@/utils/enums'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { LocationPopup } from './components/location-popup'
import { PlacePopup } from './components/place-popup'
import { favoritePlacesLayer, placesLayer, visitedPlacesLayer } from './layers'
import { useMapEventHandlers } from './map-event-handlers'

import 'maplibre-gl/dist/maplibre-gl.css'

export const Mapbox = () => {
    const supertokens = useSupertokens()
    const handlers = useMapEventHandlers()
    const mapBounds = useAppSelector(getMapBounds)
    const mapDataSource = useAppSelector(getMapDataSource)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    const placesResponse = placesAPI.useGetPlacesQuery(
        { mapBounds, selectedCategories },
        { skip: !mapBounds || mapDataSource !== MapDataSourcesEnum.ALL_PLACES },
    )

    const favoritesResponse = favoritesAPI.useGetFavoritesQuery(undefined, {
        skip: !supertokens.isAuth || mapDataSource !== MapDataSourcesEnum.FAVORITES_PLACES,
    })

    const visitedResponse = visitedAPI.useGetVisitedQuery(undefined, {
        skip: !supertokens.isAuth || mapDataSource !== MapDataSourcesEnum.VISITED_PLACES,
    })

    return (
        <ReactMapGl
            id="main"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            interactiveLayerIds={[placesLayer.id, favoritePlacesLayer.id, visitedPlacesLayer.id]}
            reuseMaps
            {...handlers}
        >
            <Source
                id="places-source"
                type="geojson"
                data={placesResponse.data || { type: 'FeatureCollection', features: [] }}
            >
                <Layer
                    {...placesLayer}
                    layout={{
                        ...placesLayer.layout,
                        visibility: mapDataSource === MapDataSourcesEnum.ALL_PLACES ? 'visible' : 'none',
                    }}
                />
            </Source>

            <Source
                id="favorite-places-source"
                type="geojson"
                data={favoritesResponse.data || { type: 'FeatureCollection', features: [] }}
            >
                <Layer
                    {...favoritePlacesLayer}
                    layout={{
                        ...favoritePlacesLayer.layout,
                        visibility: mapDataSource === MapDataSourcesEnum.FAVORITES_PLACES ? 'visible' : 'none',
                    }}
                />
            </Source>

            <Source
                id="visited-places-source"
                type="geojson"
                data={visitedResponse.data || { type: 'FeatureCollection', features: [] }}
            >
                <Layer
                    {...visitedPlacesLayer}
                    layout={{
                        ...visitedPlacesLayer.layout,
                        visibility: mapDataSource === MapDataSourcesEnum.VISITED_PLACES ? 'visible' : 'none',
                    }}
                />
            </Source>

            {handlers.placePopupInfo && <PlacePopup {...handlers.placePopupInfo} />}
            {handlers.locationPopupInfo && <LocationPopup {...handlers.locationPopupInfo} />}
        </ReactMapGl>
    )
}
