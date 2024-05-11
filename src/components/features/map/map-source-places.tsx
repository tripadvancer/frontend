'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { getMapBounds, getMapMode } from '@/redux/features/map-slice'
import { getWidgetSelectedCategories } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { MapModes } from '@/utils/enums'

import { placesLayer } from './map-layers'

export const MapSourcePlaces = () => {
    const mapMode = useAppSelector(getMapMode)
    const mapBounds = useAppSelector(getMapBounds)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    const params = { mapBounds, selectedCategories }
    const skip = { skip: mapMode !== MapModes.DEFAULT || !mapBounds }

    const { data: places } = placesAPI.useGetPlacesQuery(params, skip)

    return (
        <Source id="places-source" type="geojson" data={places || { type: 'FeatureCollection', features: [] }}>
            <Layer {...placesLayer} />
        </Source>
    )
}
