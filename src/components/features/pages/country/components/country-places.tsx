'use client'

import { useState } from 'react'

import { PlacesGrid } from '@/components/features/common/places-grid/places-grid'
import { ShowMore } from '@/components/ui/show-more'

const PAGINATION_LIMIT = 48

type CountryPlacesProps = {
    places: {
        id: number
        title: string
        cover: string | null
        avgRating: number | null
        reviewsCount: number
    }[]
}

export const CountryPlaces = (props: CountryPlacesProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const visiblePlaces = props.places.slice(0, currentPage * PAGINATION_LIMIT)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    return (
        <div className="flex flex-col gap-y-8">
            <PlacesGrid places={visiblePlaces} />
            {currentPage * PAGINATION_LIMIT < props.places.length && <ShowMore onClick={handleLoadMore} />}
        </div>
    )
}
