'use client'

import { useEffect, useState } from 'react'
import { Layer, Source, useMap } from 'react-map-gl/maplibre'

import { circle } from '@turf/turf'
import { Feature, GeoJsonProperties, Polygon } from 'geojson'
import { useMediaQuery } from 'usehooks-ts'

import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetRandomRadius } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { LngLatToArray, getBoundsFromCoordinates } from '@/utils/helpers/maps'

import { circleLayer, placesLayer } from './map-layers'

export const MapSourceRandom = () => {
    const userLocation = useAppSelector(getUserLocation)
    const radius = useAppSelector(getWidgetRandomRadius)
    const isMobile = useMediaQuery('(max-width: 639px)')

    const { map } = useMap()

    const [geoJson, setGeoJson] = useState<Feature<Polygon, GeoJsonProperties>>({
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [],
        },
        properties: {},
    })

    useEffect(() => {
        if (userLocation && map) {
            const geoJson = circle(LngLatToArray(userLocation), radius, {
                steps: 50,
                units: 'kilometers',
            })

            setGeoJson(geoJson)

            const bounds = getBoundsFromCoordinates(geoJson.geometry.coordinates[0])
            map.fitBounds(bounds, {
                animate: false,
            })
        }
    }, [userLocation, isMobile, map, radius])

    if (!userLocation) {
        return null
    }

    return (
        <>
            <Source id="random-circle-source" type="geojson" data={geoJson}>
                <Layer {...circleLayer} />
            </Source>
            <Source id="random-place-source" type="geojson" data={{ type: 'FeatureCollection', features: [] }}>
                <Layer {...placesLayer} />
            </Source>
        </>
    )
}
