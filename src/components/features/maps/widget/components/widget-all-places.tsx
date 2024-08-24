'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { getMapState } from '@/redux/features/map-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'

import { WidgetMessage } from './widget-message'
import { WidgetPlacesFeed } from './widget-places-feed/widget-places-feed'
import { WidgetPlacesFeedSkeleton } from './widget-places-feed/widget-places-feed-skeleton'

export const WidgetAllPlaces = () => {
    const t = useTranslations()
    const mapBounds = useAppSelector(getMapState).bounds
    const selectedCategories = useAppSelector(getWidgetState).selectedCategories

    const { data, isError, isLoading, isSuccess, refetch } = placesAPI.useGetPlacesQuery(
        { mapBounds, selectedCategories },
        { skip: !mapBounds },
    )

    const places = useMemo(() => data?.features.map(({ properties }) => properties) ?? [], [data])

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && places.length === 0) {
        return <WidgetMessage message={t.rich('map.widget.tabs.allPlaces.emptyMessage', { br: () => <br /> })} />
    }

    if (isSuccess && places.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesFeedSkeleton />
}
