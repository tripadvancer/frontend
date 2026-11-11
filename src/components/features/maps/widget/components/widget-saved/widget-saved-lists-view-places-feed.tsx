'use client'

import { useMemo } from 'react'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'
import { PlacesFeedSkeleton } from '@/components/features/common/places-feed/places-feed-skeleton'
import { getWidgetSelectedCategories } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'
import { listAPI } from '@/utils/redux/services/list/list.api'

import { WidgetMessage } from '../widget-message'

export const WidgetSavedListsViewPlacesFeed = ({ listId }: { listId: number }) => {
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
            <WidgetMessage
                message={
                    <>
                        This list is empty.
                        <br />
                        Add place to this list or try changing categories.
                    </>
                }
            />
        )
    }

    if (isSuccess && places.length > 0) {
        return <PlacesFeed places={places} paginationLimit={10} />
    }

    return <PlacesFeedSkeleton />
}
