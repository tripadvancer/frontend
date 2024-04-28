'use client'

import { useEffect } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { arrayToLngLat, getBoundsFromCoordinates, getMapFlyToOptions } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetPlacesFeed } from '../widget-places-feed/widget-places-feed'
import { WidgetPlacesFeedSkeleton } from '../widget-places-feed/widget-places-feed-skeleton'

export const WidgetSavedListsViewPlaces = ({ listId }: { listId: number }) => {
    const t = useI18n()
    const widgetState = useAppSelector(getWidgetState)

    const { map } = useMap()
    const { data, isError, isLoading, isSuccess, refetch } = listAPI.useGetListPlacesQuery(listId)

    const places = data?.features.map(({ properties }) => properties) ?? []

    useEffect(() => {
        // Calculate bounds for the list places
        if (isSuccess && places.length > 0) {
            if (widgetState.isShowOnlySavedPlaces) {
                if (places.length === 1) {
                    const lngLat = arrayToLngLat(places[0].coordinates)
                    map?.flyTo(getMapFlyToOptions(lngLat))
                    return
                }

                const bounds = getBoundsFromCoordinates(places.map(place => place.coordinates))
                map?.fitBounds(bounds)
            }
        }
    }, [isSuccess, places, map, widgetState.isShowOnlySavedPlaces])

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && places.length === 0) {
        return <WidgetMessage message={t('widget.visited_places.empty_message', { br: <br /> })} />
    }

    if (isSuccess && places.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesFeedSkeleton />
}
