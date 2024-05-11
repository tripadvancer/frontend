'use client'

import { Layer, Source } from 'react-map-gl/maplibre'

import { getMapBounds, getMapMode } from '@/redux/features/map-slice'
import { getWidgetActiveList, getWidgetSelectedCategories } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { MapModes } from '@/utils/enums'

import { placesLayer } from './map-layers'

export const MapSourceSavedPlaces = ({ isAuth }: { isAuth: boolean }) => {
    const mapMode = useAppSelector(getMapMode)
    const mapBounds = useAppSelector(getMapBounds)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)
    const activeList = useAppSelector(getWidgetActiveList)

    const params = { listId: activeList?.id as number, selectedCategories }
    const skip = { skip: mapMode !== MapModes.SAVED || !activeList || !isAuth }

    const { data: places } = listAPI.useGetListPlacesQuery(params, skip)

    return (
        <Source id="places-source" type="geojson" data={places || { type: 'FeatureCollection', features: [] }}>
            <Layer {...placesLayer} />
        </Source>
    )
}
