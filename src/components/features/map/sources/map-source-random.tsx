'use client'

import { useEffect, useMemo } from 'react'
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

export const MapSourceRandom = ({ userLocation }: { userLocation: LngLat }) => {
    const radius = useAppSelector(getWidgetRandomRadius)
    const isMobile = useMediaQuery('(max-width: 639px)')

    const { map } = useMap()

    const geoJson = useMemo(
        () =>
            circle(LngLatToArray(userLocation), radius, {
                steps: 50,
                units: 'kilometers',
            }),
        [userLocation, radius],
    )

    useEffect(() => {
        const bounds = getBoundsFromCoordinates(geoJson.geometry.coordinates[0])
        map?.fitBounds(bounds, { animate: false })
    }, [geoJson, map])

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
