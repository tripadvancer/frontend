'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'
import { PlacesFeedSkeleton } from '@/components/features/common/places-feed/places-feed-skeleton'
import { WidgetMessage } from '@/components/features/maps/widget/components/widget-message'
import { listAPI } from '@/redux/services/list.api'
import { useMapState } from '@/utils/hooks/use-map-state'

export const WidgetSavedListsViewPlacesFeed = ({ listId }: { listId: number }) => {
    const t = useTranslations()
    const [mapState] = useMapState()

    const { data, isError, isLoading, isSuccess, refetch } = listAPI.useGetListPlacesQuery({
        listId,
        selectedCategories: mapState.filters.categories
            .map(id => Number(id))
            .filter((id): id is number => Number.isFinite(id)),
    })

    const places = useMemo(() => data?.features.map(({ properties }) => properties) ?? [], [data])

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && places.length === 0) {
        return (
            <WidgetMessage message={t.rich('map.widget.tabs.savedPlaces.lists.emptyMessage', { br: () => <br /> })} />
        )
    }

    if (isSuccess && places.length > 0) {
        return <PlacesFeed places={places} paginationLimit={10} />
    }

    return <PlacesFeedSkeleton />
}
