'use client'

import { useState } from 'react'

import type { ICountry } from '@/types/country'

import { CountryPreview } from '@/components/CountryPreview'
import { ShowMore } from '@/components/ShowMore'

const PAGINATION_LIMIT = 16

type CountryFeedProps = {
    countries: ICountry[]
}

export const CountryFeed = ({ countries }: CountryFeedProps) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    const visibleCountries = countries.slice(0, currentPage * PAGINATION_LIMIT)

    return (
        <>
            <div className="mb-8 grid grid-cols-4 gap-8 phone:grid-cols-2 phone:gap-4">
                {visibleCountries.map((country, index) => (
                    <CountryPreview key={index} {...country} />
                ))}
            </div>

            {currentPage * PAGINATION_LIMIT < countries.length && <ShowMore onClick={handleLoadMore} />}
        </>
    )
}
