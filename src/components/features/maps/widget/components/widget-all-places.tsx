'use client'

import { useMemo } from 'react'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'
import { PlacesFeedSkeleton } from '@/components/features/common/places-feed/places-feed-skeleton'
import { getMapState } from '@/utils/redux/features/map-slice'
import { getWidgetState } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'
import { placesAPI } from '@/utils/redux/services/places/places.api'

import { WidgetMessage } from './widget-message'

export const WidgetAllPlaces = () => {
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
        return (
            <WidgetMessage
                message={
                    <>
                        No places found.
                        <br />
                        Try changing categories or zooming out the map.
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
