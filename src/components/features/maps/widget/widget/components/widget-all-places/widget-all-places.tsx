'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'
import { PlacesFeedSkeleton } from '@/components/features/common/places-feed/places-feed-skeleton'
import { WidgetMessage } from '@/components/features/maps/widget/components/widget-message'
import { getMapState } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places.api'
import { useMapState } from '@/utils/hooks/use-map-state'

export const WidgetAllPlaces = () => {
    const t = useTranslations()
    const mapBounds = useAppSelector(getMapState).bounds
    const [mapState] = useMapState()

    const { data, isError, isLoading, isSuccess, refetch } = placesAPI.useGetPlacesQuery(
        {
            mapBounds,
            selectedCategories: mapState.filters.categories
                .map(id => Number(id))
                .filter((id): id is number => Number.isFinite(id)),
        },
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
