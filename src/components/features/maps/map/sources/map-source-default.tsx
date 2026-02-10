'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { getMapBounds } from '@/redux/features/map-slice'
import { getWidgetSelectedCategories } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places/places.api'

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
