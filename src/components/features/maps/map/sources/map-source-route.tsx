'use client'

import { useEffect } from 'react'
import { GeoJSONSource, Layer, LngLatLike, Source, useMap } from 'react-map-gl/maplibre'

import polyline from '@mapbox/polyline'

import { getRouteResponse } from '@/redux/features/route-slice'
import { useAppSelector } from '@/redux/hooks'

import { routeLayer } from './map-layers'

export const MapSourceRoute = () => {
    const routeResponse = useAppSelector(getRouteResponse)

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
                source.setData(geometry)
            })
        }
    }, [routeResponse])

    return (
        <Source id="route-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
            <Layer {...routeLayer} />
        </Source>
    )
}
