'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { placesAPI } from '@/redux/services/places.api'
import { useMapFilters } from '@/utils/hooks/use-map-filters'

import { placesLayer } from './map-layers'

export const MapSourceDefault = () => {
    const [initialFilters] = useMapFilters()

    const { data: places, isSuccess } = placesAPI.useGetPlacesByCenterQuery({
        lat: initialFilters.lat,
        lng: initialFilters.lng,
        selectedCategories: initialFilters.categories,
        skip_visited: initialFilters.skipVisited,
    })

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
