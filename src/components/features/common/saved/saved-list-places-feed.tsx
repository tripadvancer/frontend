'use client'

import { useMemo } from 'react'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'
import { PlacesFeedSkeleton } from '@/components/features/common/places-feed/places-feed-skeleton'
import { FormButton } from '@/components/ui/form-button'
import { listAPI } from '@/utils/redux/services/list/list.api'

export const SavedListPlacesFeed = ({
    listId,
    selectedCategories = [],
}: {
    listId: number
    selectedCategories?: number[]
}) => {
    const { data, isError, isLoading, isSuccess, refetch } = listAPI.useGetListPlacesQuery({
        listId,
        selectedCategories,
    })

    const places = useMemo(() => data?.features.map(({ properties }) => properties) ?? [], [data])

    if (isError) {
        return (
            <section className="mx-auto flex flex-col items-center justify-center gap-y-4">
                <p className="text-black-40 text-center">
                    An unexpected error has occurred.
                    <br />
                    Please try again later.
                </p>
                <FormButton type="stroke" size="small" shape="rounded" isLoading={isLoading} onClick={refetch}>
                    Try again
                </FormButton>
            </section>
        )
    }

    if (isSuccess && places.length === 0) {
        return (
            <p className="text-black-40 text-center">
                This list is empty.
                <br />
                Add places to this list to see them here.
            </p>
        )
    }

    if (isSuccess && places.length > 0) {
        return <PlacesFeed places={places} paginationLimit={10} />
    }

    return <PlacesFeedSkeleton />
}
