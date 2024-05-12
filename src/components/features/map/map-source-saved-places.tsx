'use client'

import { useEffect, useMemo } from 'react'
import { Layer, Source, useMap } from 'react-map-gl/maplibre'

import { useMediaQuery } from 'usehooks-ts'

import { getWidgetSelectedCategories } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { arrayToLngLat, getBoundsFromCoordinates, getMapFlyToOptions } from '@/utils/helpers/maps'

import { placesLayer } from './map-layers'

export const MapSourceSavedPlaces = ({ listId }: { listId: number }) => {
    const isMobile = useMediaQuery('(max-width: 639px)')
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    const { map } = useMap()
    const { data, isSuccess } = listAPI.useGetListPlacesQuery({ listId, selectedCategories })

    const places = useMemo(() => data?.features.map(({ properties }) => properties) ?? [], [data])

    useEffect(() => {
        if (!isMobile && isSuccess && places.length > 0) {
            if (places.length === 1) {
                const lngLat = arrayToLngLat(places[0].coordinates)
                map?.flyTo(getMapFlyToOptions(lngLat))
                return
            }

            const bounds = getBoundsFromCoordinates(places.map(place => place.coordinates))
            map?.fitBounds(bounds)
        }
    }, [isMobile, isSuccess, places, map])

    return (
        <Source id="places-source" type="geojson" data={isSuccess ? data : { type: 'FeatureCollection', features: [] }}>
            <Layer {...placesLayer} />
        </Source>
    )
}
