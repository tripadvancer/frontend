'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { getWidgetSelectedCategories } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'

import { placesLayer } from './map-layers'

export const MapSourceSavedPlaces = ({ listId }: { listId: number }) => {
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)
    const { data: places } = listAPI.useGetListPlacesQuery({ listId, selectedCategories })

    return (
        <Source id="places-source" type="geojson" data={places}>
            <Layer {...placesLayer} />
        </Source>
    )
}
