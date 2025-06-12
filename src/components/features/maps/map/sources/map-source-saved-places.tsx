'use client'

import { useEffect, useMemo } from 'react'
import { Layer, Source, useMap } from 'react-map-gl/maplibre'

import { listAPI } from '@/redux/services/list.api'
import { arrayToLngLat, getBoundsFromCoordinates, getMapFlyToOptions } from '@/utils/helpers/maps'
import { useMapFilters } from '@/utils/hooks/use-map-filters'

import { placesLayer } from './map-layers'

export const MapSourceSavedPlaces = ({ listId }: { listId: number }) => {
    const [initialFilters] = useMapFilters()

    const { map } = useMap()
    const { data, isSuccess } = listAPI.useGetListPlacesQuery({ listId, selectedCategories: initialFilters.categories })

    const places = useMemo(() => data?.features.map(({ properties }) => properties) ?? [], [data])

    useEffect(() => {
        if (isSuccess && places.length > 0 && map) {
            if (places.length === 1) {
                const lngLat = arrayToLngLat(places[0].coordinates)
                map.flyTo(getMapFlyToOptions(lngLat))
                return
            }

            const bounds = getBoundsFromCoordinates(places.map(place => place.coordinates))
            map.fitBounds(bounds)
        }
    }, [isSuccess, places, map])

    return (
        <Source id="places-source" type="geojson" data={isSuccess ? data : { type: 'FeatureCollection', features: [] }}>
            <Layer {...placesLayer} />
        </Source>
    )
}
