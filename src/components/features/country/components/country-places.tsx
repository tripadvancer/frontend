'use client'

import { useState } from 'react'

import type { IPlacePreview } from '@/utils/types/place'

import { ShowMore } from '@/components/ui/show-more'

import { CountryPlace } from './country-place'

const PAGINATION_LIMIT = 48

export const CountryPlaces = ({ places }: { places: IPlacePreview[] }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const visiblePlaces = places.slice(0, currentPage * PAGINATION_LIMIT)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
                {visiblePlaces.map((place, index) => (
                    <CountryPlace key={index} {...place} />
                ))}
            </div>
            {currentPage * PAGINATION_LIMIT < places.length && <ShowMore onClick={handleLoadMore} />}
        </div>
    )
}
