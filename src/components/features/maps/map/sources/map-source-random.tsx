'use client'

import { useMemo } from 'react'
import { Layer, Source } from 'react-map-gl/maplibre'

import { circle } from '@turf/turf'
import { Feature, GeoJsonProperties, Polygon } from 'geojson'

import { LngLatToArray } from '@/utils/helpers/maps'
import { getUserLocation } from '@/utils/redux/features/user-slice'
import { getWidgetRandomRadius } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'

import { circleLayer, placesLayer } from './map-layers'

export const MapSourceRandom = () => {
    const userLocation = useAppSelector(getUserLocation)
    const radius = useAppSelector(getWidgetRandomRadius)
    const geoJson = useMemo<Feature<Polygon, GeoJsonProperties> | null>(() => {
        if (!userLocation) {
            return null
        }

        return circle(LngLatToArray(userLocation), radius, {
            steps: 50,
            units: 'kilometers',
        })
    }, [userLocation, radius])

    if (!geoJson) {
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
