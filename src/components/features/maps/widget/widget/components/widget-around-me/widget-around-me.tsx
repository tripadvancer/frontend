'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { PlacesFeed } from '@/components/features/common/places-feed/places-feed'
import { PlacesFeedSkeleton } from '@/components/features/common/places-feed/places-feed-skeleton'
import { WidgetMessage } from '@/components/features/maps/widget/components/widget-message'
import { getMapState } from '@/redux/features/map-slice'
import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around.api'
import { placesAPI } from '@/redux/services/places.api'

export const WidgetAroundMe = () => {
    const t = useTranslations()
    const userLocation = useAppSelector(getUserLocation)
    const mapBounds = useAppSelector(getMapState).bounds
    const selectedCategories = useAppSelector(getWidgetState).selectedCategories

    if (!userLocation) {
        return <WidgetMessage message={t('map.widget.aroundMe.notLocation')} />
    }

    const { data, isError, isLoading, isSuccess, refetch } = placesAroundAPI.useGetPlacesAroundQuery({
        ...userLocation,
        radius: 1000000, // 10 km radius
        categories: [],
    })

    const places = useMemo(
        () =>
            data?.map(place => ({
                id: place.id,
                title: place.title,
                cover: place.cover,
                avgRating: place.avgRating,
                reviewsCount: place.reviewsCount,
                distance: place.distance,
                coordinates: [0, 0], // Placeholder, will be updated later
                countryCode: null,
                isVisited: false,
                isSaved: false,

                // reviewsCount: number
                // countryCode: string | null
                // isVisited: boolean
                // isSaved: boolean
                // coordinates: number[]
            })),
        [data],
    )

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && places && places.length === 0) {
        return <WidgetMessage message={t.rich('map.widget.tabs.allPlaces.emptyMessage', { br: () => <br /> })} />
    }

    if (isSuccess && places && places.length > 0) {
        return <PlacesFeed places={places} paginationLimit={10} />
    }

    return <PlacesFeedSkeleton />
}
