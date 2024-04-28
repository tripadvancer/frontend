'use client'

import { useMap } from 'react-map-gl/maplibre'

import { getMapState } from '@/redux/features/map-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from './widget-message'
import { WidgetPlacesFeed } from './widget-places-feed/widget-places-feed'
import { WidgetPlacesFeedSkeleton } from './widget-places-feed/widget-places-feed-skeleton'

export const WidgetAllPlaces = () => {
    const t = useI18n()
    const mapBounds = useAppSelector(getMapState).bounds
    const selectedCategories = useAppSelector(getWidgetState).selectedCategories

    const { map } = useMap()

    const { data, isError, isLoading, isSuccess, refetch } = placesAPI.useGetPlacesQuery(
        { mapBounds, selectedCategories },
        { skip: !mapBounds },
    )

    const places = data?.features.map(({ properties }) => properties) ?? []

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && places.length === 0) {
        return <WidgetMessage message={t('widget.all_places.empty_message', { br: <br /> })} />
    }

    if (isSuccess && places.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesFeedSkeleton />
}
