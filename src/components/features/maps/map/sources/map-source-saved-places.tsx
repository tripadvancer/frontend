'use client'

import { useEffect, useMemo } from 'react'
import { Layer, Source, useMap } from 'react-map-gl/maplibre'

import { useAppSettings } from '@/components/providers/settings-provider'
import { arrayToLngLat, getBoundsFromCoordinates, getMapFlyToOptions } from '@/utils/helpers/maps'
import { getWidgetSelectedCategories } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'
import { listAPI } from '@/utils/redux/services/list/list.api'

import { placesLayer } from './map-layers'

export const MapSourceSavedPlaces = ({ listId }: { listId: number }) => {
    const settings = useAppSettings()
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    const { map } = useMap()
    const { data, isSuccess } = listAPI.useGetListPlacesQuery({ listId, selectedCategories })

    const places = useMemo(() => data?.features.map(({ properties }) => properties) ?? [], [data])

    useEffect(() => {
        if (isSuccess && places.length > 0 && map) {
            if (places.length === 1) {
                const lngLat = arrayToLngLat(places[0].coordinates)
                if (settings) {
                    map.flyTo(getMapFlyToOptions(lngLat, settings.map.flyToZoom))
                }
                return
            }

            const bounds = getBoundsFromCoordinates(places.map(place => place.coordinates))
            map.fitBounds(bounds)
        }
    }, [isSuccess, places, map, settings])

    return (
        <Source id="places-source" type="geojson" data={isSuccess ? data : { type: 'FeatureCollection', features: [] }}>
            <Layer {...placesLayer} />
        </Source>
    )
}
