'use client'

import { useCallback, useRef } from 'react'
import { Layer, MapRef, Marker, Map as ReactMapGl, Source } from 'react-map-gl'

import { LocationIcon16, MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { getMapState } from '@/redux/features/map-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { favoritesAPI } from '@/redux/services/favorites-api'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { MapDataSourcesEnum } from '@/utils/enums'
import { useUserLocation } from '@/utils/hooks/use-user-location'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import 'maplibre-gl/dist/maplibre-gl.css'

import { MapControl } from './components/map-control'
import { MapPinUser } from './components/map-pin-user'
import { MapPopupLocation } from './components/map-popup-location'
import { MapPopupPlace } from './components/map-popup-place'
import { useMapEventHandlers } from './map-event-handlers'
import { favoritePlacesLayer, placesLayer, visitedPlacesLayer } from './map-layers'

export const Mapbox = () => {
    const supertokens = useSupertokens()
    const handlers = useMapEventHandlers()
    const mapBounds = useAppSelector(getMapState).bounds
    const mapDataSource = useAppSelector(getWidgetState).dataSource
    const selectedCategories = useAppSelector(getWidgetState).selectedCategories
    const userLocation = useAppSelector(getUserLocation)

    const mapRef = useRef<MapRef>(null)

    const { handleLocate, isLocating } = useUserLocation()

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

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    return (
        <ReactMapGl
            id="main"
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            interactiveLayerIds={[placesLayer.id, favoritePlacesLayer.id, visitedPlacesLayer.id]}
            attributionControl={false}
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

            <div className="absolute bottom-2 right-2 flex flex-col gap-y-1 sm:bottom-auto sm:left-2 sm:right-auto sm:top-2">
                <MapControl desktopOnly onClick={handleZoomIn}>
                    <PlusIcon16 />
                </MapControl>

                <MapControl desktopOnly onClick={handleZoomOut}>
                    <MinusIcon16 />
                </MapControl>

                <MapControl isLoading={isLocating} onClick={handleLocate}>
                    <LocationIcon16 />
                </MapControl>
            </div>

            {userLocation && (
                <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="bottom">
                    <MapPinUser />
                </Marker>
            )}

            {handlers.placePopupInfo && <MapPopupPlace {...handlers.placePopupInfo} />}
            {handlers.locationPopupInfo && <MapPopupLocation {...handlers.locationPopupInfo} />}
        </ReactMapGl>
    )
}
