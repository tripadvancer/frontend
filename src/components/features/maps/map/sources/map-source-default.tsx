'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { getMapBounds } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places/places.api'
import { useMapState } from '@/utils/map/use-map-state'

import { placesLayer } from './map-layers'

export const MapSourceDefault = () => {
    const mapBounds = useAppSelector(getMapBounds)

    const [mapState] = useMapState()

    const { data: places, isSuccess } = placesAPI.useGetPlacesQuery({
        mapBounds,
        selectedCategories: mapState.filters.categories
            .map(id => Number(id))
            .filter((id): id is number => Number.isFinite(id)),
        skip_visited: mapState.filters.skipVisited,
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
