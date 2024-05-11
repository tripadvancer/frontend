'use client'

import { useEffect, useMemo } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { useMediaQuery } from 'usehooks-ts'

import { listAPI } from '@/redux/services/list-api'
import { arrayToLngLat, getBoundsFromCoordinates, getMapFlyToOptions } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetPlacesFeed } from '../widget-places-feed/widget-places-feed'
import { WidgetPlacesFeedSkeleton } from '../widget-places-feed/widget-places-feed-skeleton'

export const WidgetSavedListsViewPlacesFeed = ({ listId }: { listId: number }) => {
    const t = useI18n()
    const isMobile = useMediaQuery('(max-width: 639px)')

    const { map } = useMap()
    const { data, isError, isLoading, isSuccess, refetch } = listAPI.useGetListPlacesQuery(listId)

    const places = useMemo(() => data?.features.map(({ properties }) => properties) ?? [], [data])

    useEffect(() => {
        if (isSuccess && places.length > 0 && !isMobile) {
            if (places.length === 1) {
                const lngLat = arrayToLngLat(places[0].coordinates)
                map?.flyTo(getMapFlyToOptions(lngLat))
                return
            }

            const bounds = getBoundsFromCoordinates(places.map(place => place.coordinates))
            map?.fitBounds(bounds)
        }
    }, [isSuccess, places, map, isMobile])

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && places.length === 0) {
        return <WidgetMessage message={t('widget.saved.lists.empty_message', { br: <br /> })} />
    }

    if (isSuccess && places.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesFeedSkeleton />
}
