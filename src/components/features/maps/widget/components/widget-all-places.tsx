'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'
import { PlacesFeedSkeleton } from '@/components/features/common/places-feed/places-feed-skeleton'
import { getMapState } from '@/utils/redux/features/map-slice'
import { getWidgetState } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'
import { placesAPI } from '@/utils/redux/services/places/places.api'

import { WidgetMessage } from './widget-message'

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
        return <PlacesFeed places={places} paginationLimit={10} />
    }

    return <PlacesFeedSkeleton />
}
