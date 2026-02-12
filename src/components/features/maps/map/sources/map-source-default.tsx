'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { getMapBounds } from '@/utils/redux/features/map-slice'
import { getWidgetSelectedCategories } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'
import { placesAPI } from '@/utils/redux/services/places/places.api'

import { placesLayer } from './map-layers'

export const MapSourceDefault = () => {
    const mapBounds = useAppSelector(getMapBounds)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)
    const { data: places, isSuccess } = placesAPI.useGetPlacesQuery({ mapBounds, selectedCategories })

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
