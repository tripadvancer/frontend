'use client'

import { useEffect } from 'react'
import { Layer, Source, useMap } from 'react-map-gl/maplibre'

import { circle } from '@turf/turf'
import { useMediaQuery } from 'usehooks-ts'

import type { LngLat } from '@/utils/types/geo'

import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetRandomRadius } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { LngLatToArray, getBoundsFromCoordinates } from '@/utils/helpers/maps'

import { circleLayer, placesLayer } from './map-layers'

export const MapSourceRandomContainer = () => {
    const userLocation = useAppSelector(getUserLocation)

    if (!userLocation) {
        return null
    }

    return <MapSourceRandom userLocation={userLocation} />
}

const MapSourceRandom = ({ userLocation }: { userLocation: LngLat }) => {
    const radius = useAppSelector(getWidgetRandomRadius)
    const isMobile = useMediaQuery('(max-width: 639px)')

    const { map } = useMap()

    const geoJson = circle(LngLatToArray(userLocation), radius, {
        steps: 50,
        units: 'kilometers',
    })

    useEffect(() => {
        const bounds = getBoundsFromCoordinates(geoJson.geometry.coordinates[0])
        map?.fitBounds(bounds, { animate: false })
    }, [isMobile, map, radius, geoJson])

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
