'use client'

import { useState } from 'react'

import type { ICountry } from '@/utils/types/country'

import { ShowMore } from '@/components/show-more'

import { Country } from './country'

const PAGINATION_LIMIT = 12

type CountriesFeedProps = {
    countries: ICountry[]
}

export const CountriesFeed = ({ countries }: CountriesFeedProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const visibleCountries = countries.slice(0, currentPage * PAGINATION_LIMIT)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
                {visibleCountries.map((country, index) => (
                    <Country key={index} {...country} />
                ))}
            </div>
            {currentPage * PAGINATION_LIMIT < countries.length && <ShowMore onClick={handleLoadMore} />}
        </div>
    )
}
