'use client'

import { useState } from 'react'

import { PlacesGrid } from '@/components/features/common/places-grid/places-grid'
import { ShowMore } from '@/components/ui/show-more'

const PAGINATION_LIMIT = 100

type CountryPlacesProps = {
    places: {
        id: number
        title: string
        cover: string | null
        rating: {
            avgRating: number | null
            reviewsCount: number
        }
    }[]
}

export const CountryPlaces = (props: CountryPlacesProps) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:gap-8">
                <PlacesGrid places={props.places.slice(0, currentPage * PAGINATION_LIMIT)} />
            </div>

            {currentPage * PAGINATION_LIMIT < props.places.length && <ShowMore onClick={handleLoadMore} />}
        </div>
    )
}
