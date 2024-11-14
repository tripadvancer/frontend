'use client'

import { useEffect } from 'react'
import { GeoJSONSource, Layer, LngLatLike, Source, useMap } from 'react-map-gl/maplibre'

import polyline from '@mapbox/polyline'
import { CostingModel, RouteResponse } from '@stadiamaps/api'

import { getRouteCostingModel } from '@/redux/features/map-slice'
import { getRouteResponse } from '@/redux/features/route-slice'
import { useAppSelector } from '@/redux/hooks'

import { routeLayerVehicle, routeLayerWalking } from './map-layers'

export const MapSourceRoute = () => {
    const routeResponse = useAppSelector(getRouteResponse) as RouteResponse
    const costingModel = useAppSelector(getRouteCostingModel)

    const { map } = useMap()

    useEffect(() => {
        if (routeResponse) {
            // Construct a bounding box in the sw, ne format required by MapLibre. Note the lon, lat order.
            const sw = [routeResponse.trip.summary.minLon, routeResponse.trip.summary.minLat] as LngLatLike
            const ne = [routeResponse.trip.summary.maxLon, routeResponse.trip.summary.maxLat] as LngLatLike

            // Zoom to the new bounding box to focus on the route,
            // with a 50px padding around the edges. See https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#fitbounds
            map?.fitBounds([sw, ne])

            // For each leg of the trip...
            routeResponse.trip.legs.forEach(leg => {
                const geometry = polyline.toGeoJSON(leg.shape, 6)
                const source = map?.getSource('route-source') as GeoJSONSource
                source?.setData(geometry)
            })
        }
    }, [map, routeResponse])

    return (
        <Source id="route-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
            <Layer {...(costingModel === CostingModel.Pedestrian ? routeLayerWalking : routeLayerVehicle)} />
        </Source>
    )
}
