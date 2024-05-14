'use client'

import { useEffect } from 'react'
import { Layer, Source, useMap } from 'react-map-gl/maplibre'

import { circle } from '@turf/turf'
import { useMediaQuery } from 'usehooks-ts'

import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetRandomRadius } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { LngLatToArray, getBoundsFromCoordinates, getMapFlyToOptions } from '@/utils/helpers/maps'

import { circleLayer, placesLayer } from './map-layers'

export const MapSourceRandom = () => {
    const userLocation = useAppSelector(getUserLocation)
    const radius = useAppSelector(getWidgetRandomRadius)
    const isMobile = useMediaQuery('(max-width: 639px)')

    const { map } = useMap()

    useEffect(() => {
        if (userLocation && map) {
            const bounds = getBoundsFromCoordinates(geoJson.geometry.coordinates[0])
            map.fitBounds(bounds)
        }
    }, [userLocation, isMobile, map, radius])

    if (!userLocation) {
        return null
    }

    const geoJson = circle(LngLatToArray(userLocation), radius, {
        steps: 50,
        units: 'kilometers',
    })

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
