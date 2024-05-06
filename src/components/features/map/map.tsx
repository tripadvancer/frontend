'use client'

import { useCallback, useRef } from 'react'
import { AttributionControl, Layer, MapRef, Marker, Map as ReactMapGl, Source } from 'react-map-gl/maplibre'

import { LngLat } from '@/utils/types/geo'

import { LocationIcon16, MinusIcon16, PlusIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'
import { getMapState } from '@/redux/features/map-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { MapDataSourcesEnum } from '@/utils/enums'
import { useUserLocation } from '@/utils/hooks/use-user-location'

import 'maplibre-gl/dist/maplibre-gl.css'

import { MapPinUser } from './components/map-pin-user'
import { MapPopupLocation } from './components/map-popup-location'
import { MapPopupPlace } from './components/map-popup-place'
import { useMapEventHandlers } from './map-event-handlers'
import { placesLayer, routeLayer, savedPlacesLayer, userRadiusLayer, visitedPlacesLayer } from './map-layers'

type MapProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const Map = ({ activeUserId, isAuth, isEmailVerified }: MapProps) => {
    const handlers = useMapEventHandlers()
    const mapBounds = useAppSelector(getMapState).bounds
    const listId = useAppSelector(getWidgetState).activeList?.id
    const mapDataSource = useAppSelector(getWidgetState).dataSource
    const selectedCategories = useAppSelector(getWidgetState).selectedCategories
    const userLocation = useAppSelector(getUserLocation)
    const userRadius = useAppSelector(getWidgetState).randomRadius

    const mapRef = useRef<MapRef>(null)

    const { handleLocate, isLocating } = useUserLocation()

    const { data: places } = placesAPI.useGetPlacesQuery(
        { mapBounds, selectedCategories },
        { skip: !mapBounds || mapDataSource !== MapDataSourcesEnum.ALL_PLACES },
    )

    const { data: saved } = listAPI.useGetListPlacesQuery(listId as number, {
        skip: !isAuth || !listId || mapDataSource !== MapDataSourcesEnum.SAVED_PLACES,
    })

    const { data: visited } = visitedAPI.useGetVisitedQuery(undefined, {
        skip: !isAuth || mapDataSource !== MapDataSourcesEnum.VISITED_PLACES,
    })

    const handleZoomIn = useCallback(() => {
        mapRef.current?.zoomIn({ duration: 500 })
    }, [])

    const handleZoomOut = useCallback(() => {
        mapRef.current?.zoomOut({ duration: 500 })
    }, [])

    const createGeoJSONCircle = (center: LngLat, radiusInKm: number, points: number) => {
        if (!points) points = 64

        var coords = {
            latitude: center.lat,
            longitude: center.lng,
        }

        var km = radiusInKm

        var ret = []
        var distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180))
        var distanceY = km / 110.574

        var theta, x, y
        for (var i = 0; i < points; i++) {
            theta = (i / points) * (2 * Math.PI)
            x = distanceX * Math.cos(theta)
            y = distanceY * Math.sin(theta)

            ret.push([coords.longitude + x, coords.latitude + y])
        }
        ret.push(ret[0])

        console.log(ret)

        return {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [ret],
                    },
                },
            ],
        }
    }

    return (
        <ReactMapGl
            id="map"
            ref={mapRef}
            mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
            interactiveLayerIds={[placesLayer.id, savedPlacesLayer.id, visitedPlacesLayer.id, routeLayer.id]}
            attributionControl={false}
            reuseMaps
            {...handlers}
        >
            <Source
                id="user-radius-source"
                type="geojson"
                data={createGeoJSONCircle(userLocation as LngLat, userRadius, 64)}
            >
                <Layer {...userRadiusLayer} />
            </Source>

            <Source id="route-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
                <Layer {...routeLayer} />
            </Source>

            <Source id="places-source" type="geojson" data={places || { type: 'FeatureCollection', features: [] }}>
                <Layer
                    {...placesLayer}
                    layout={{
                        ...placesLayer.layout,
                        visibility: mapDataSource === MapDataSourcesEnum.ALL_PLACES ? 'visible' : 'none',
                    }}
                />
            </Source>

            <Source id="saved-places-source" type="geojson" data={saved || { type: 'FeatureCollection', features: [] }}>
                <Layer
                    {...savedPlacesLayer}
                    layout={{
                        ...savedPlacesLayer.layout,
                        visibility: mapDataSource === MapDataSourcesEnum.SAVED_PLACES ? 'visible' : 'none',
                    }}
                />
            </Source>

            <Source
                id="visited-places-source"
                type="geojson"
                data={visited || { type: 'FeatureCollection', features: [] }}
            >
                <Layer
                    {...visitedPlacesLayer}
                    layout={{
                        ...visitedPlacesLayer.layout,
                        visibility: mapDataSource === MapDataSourcesEnum.VISITED_PLACES ? 'visible' : 'none',
                    }}
                />
            </Source>

            <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-y-1 sm:bottom-auto sm:left-2 sm:right-auto sm:top-2">
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
            {handlers.locationPopupInfo && (
                <MapPopupLocation
                    activeUserId={activeUserId}
                    isAuth={isAuth}
                    isEmailVerified={isEmailVerified}
                    {...handlers.locationPopupInfo}
                />
            )}

            <AttributionControl compact />
        </ReactMapGl>
    )
}
