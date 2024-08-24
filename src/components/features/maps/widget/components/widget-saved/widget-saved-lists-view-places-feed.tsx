'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { getWidgetSelectedCategories } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'

import { WidgetMessage } from '../widget-message'
import { WidgetPlacesFeed } from '../widget-places-feed/widget-places-feed'
import { WidgetPlacesFeedSkeleton } from '../widget-places-feed/widget-places-feed-skeleton'

export const WidgetSavedListsViewPlacesFeed = ({ listId }: { listId: number }) => {
    const t = useTranslations()
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    const { data, isError, isLoading, isSuccess, refetch } = listAPI.useGetListPlacesQuery({
        listId,
        selectedCategories,
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
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesFeedSkeleton />
}
