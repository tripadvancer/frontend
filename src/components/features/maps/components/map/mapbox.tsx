'use client'

import { Layer, Map as ReactMapGl, Source } from 'react-map-gl'

import { getMapBounds, getMapDataSource, getWidgetSelectedCategories } from '@/redux/features/map-slice'
import { getIsAuth } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { favoritesAPI } from '@/redux/services/favorites-api'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { MapDataSourcesEnum } from '@/utils/enums'

import { LocationPopup } from './components/location-popup'
import { PlacePopup } from './components/place-popup'
import { favoritePlacesLayer, placesLayer, visitedPlacesLayer } from './layers'
import { useMapEventHandlers } from './map-event-handlers'

import 'maplibre-gl/dist/maplibre-gl.css'

export const Mapbox = () => {
    const handlers = useMapEventHandlers()
    const isAuth = useAppSelector(getIsAuth)
    const mapBounds = useAppSelector(getMapBounds)
    const mapDataSource = useAppSelector(getMapDataSource)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    const placesResponse = placesAPI.useGetPlacesQuery(
        { mapBounds, selectedCategories },
        { skip: !mapBounds || mapDataSource !== MapDataSourcesEnum.ALL_PLACES },
    )

    const favoritesResponse = favoritesAPI.useGetFavoritesQuery(undefined, {
        skip: !isAuth || mapDataSource !== MapDataSourcesEnum.FAVORITES_PLACES,
    })

    const visitedResponse = visitedAPI.useGetVisitedQuery(undefined, {
        skip: !isAuth || mapDataSource !== MapDataSourcesEnum.VISITED_PLACES,
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
            {mapDataSource === MapDataSourcesEnum.ALL_PLACES && placesResponse.isSuccess && (
                <Source id="places-source" type="geojson" data={placesResponse.data}>
                    <Layer {...placesLayer} />
                </Source>
            )}

            {mapDataSource === MapDataSourcesEnum.FAVORITES_PLACES && favoritesResponse.isSuccess && (
                <Source id="favorite-places-source" type="geojson" data={favoritesResponse.data}>
                    <Layer {...favoritePlacesLayer} />
                </Source>
            )}

            {mapDataSource === MapDataSourcesEnum.VISITED_PLACES && visitedResponse.isSuccess && (
                <Source id="visited-places-source" type="geojson" data={visitedResponse.data}>
                    <Layer {...visitedPlacesLayer} />
                </Source>
            )}

            {handlers.placePopupInfo && <PlacePopup {...handlers.placePopupInfo} />}
            {handlers.locationPopupInfo && <LocationPopup {...handlers.locationPopupInfo} />}
        </ReactMapGl>
    )
}
