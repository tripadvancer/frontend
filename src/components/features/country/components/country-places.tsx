'use client'

import { useState } from 'react'

import type { IPlacePreview } from '@/utils/types/place'

import { PlacesFeed } from '@/components/features/places-feed/places-feed'
import { ShowMore } from '@/components/ui/show-more'

const PAGINATION_LIMIT = 48

export const CountryPlaces = ({ places }: { places: IPlacePreview[] }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const visiblePlaces = places.slice(0, currentPage * PAGINATION_LIMIT)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    return (
        <div className="flex flex-col gap-y-8">
            <PlacesFeed places={visiblePlaces} />
            {currentPage * PAGINATION_LIMIT < places.length && <ShowMore onClick={handleLoadMore} />}
        </div>
    )
}
