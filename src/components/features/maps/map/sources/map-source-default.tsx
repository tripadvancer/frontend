'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { getMapBounds } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places.api'
import { useMapFilters } from '@/utils/hooks/use-map-filters'

import { placesLayer } from './map-layers'

export const MapSourceDefault = () => {
    const mapBounds = useAppSelector(getMapBounds)
    const [initialFilters] = useMapFilters()

    const { data: places, isSuccess } = placesAPI.useGetPlacesQuery(
        {
            mapBounds,
            selectedCategories: initialFilters.categories,
            skip_visited: initialFilters.skipVisited,
        },
        {
            skip: !mapBounds,
        },
    )

    return (
        <Source
            id="places-source"
            type="geojson"
            data={isSuccess ? places : { type: 'FeatureCollection', features: [] }}
        >
            <Layer {...placesLayer} />
        </Source>
    )
}
