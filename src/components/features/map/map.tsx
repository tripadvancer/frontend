'use client'

import { useCallback, useRef } from 'react'
import { AttributionControl, Layer, MapRef, Marker, Map as ReactMapGl, Source } from 'react-map-gl/maplibre'

import { LocationIcon16, MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'
import { getMapState } from '@/redux/features/map-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { favoritesAPI } from '@/redux/services/favorites-api'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { MapDataSourcesEnum } from '@/utils/enums'
import { useUserLocation } from '@/utils/hooks/use-user-location'

import 'maplibre-gl/dist/maplibre-gl.css'

import { MapPinUser } from './components/map-pin-user'
import { MapPopupLocation } from './components/map-popup-location'
import { MapPopupPlace } from './components/map-popup-place'
import { useMapEventHandlers } from './map-event-handlers'
import { favoritePlacesLayer, placesLayer, visitedPlacesLayer } from './map-layers'

export const Map = ({ isAuth }: { isAuth: boolean }) => {
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
        skip: !isAuth || mapDataSource !== MapDataSourcesEnum.FAVORITES_PLACES,
    })

    const visitedResponse = visitedAPI.useGetVisitedQuery(undefined, {
        skip: !isAuth || mapDataSource !== MapDataSourcesEnum.VISITED_PLACES,
    })

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    return (
        <ReactMapGl
            id="mainMap"
            ref={mapRef}
            mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
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

            <div className="absolute bottom-2 right-2 z-40 flex flex-col gap-y-1 sm:bottom-auto sm:left-2 sm:right-auto sm:top-2">
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

            <AttributionControl compact />
        </ReactMapGl>
    )
}
