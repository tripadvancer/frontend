'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'
import { PlacesFeedSkeleton } from '@/components/features/common/places-feed/places-feed-skeleton'
import { WidgetMessage } from '@/components/features/maps/widget/components/widget-message'
import { placesAPI } from '@/redux/services/places.api'
import { useMapFilters } from '@/utils/hooks/use-map-filters'

export const WidgetAllPlaces = () => {
    const t = useTranslations()
    const [initialFilters] = useMapFilters()

    const { data, isError, isLoading, isSuccess, refetch } = placesAPI.useGetPlacesByCenterQuery({
        lat: initialFilters.lat,
        lng: initialFilters.lng,
        selectedCategories: initialFilters.categories,
        skip_visited: initialFilters.skipVisited,
    })

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
