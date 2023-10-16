'use client'

import { useState } from 'react'

import type { ICountry } from '@/types/country'

import { ShowMore } from '@/components/ShowMore'

import { Country } from './Country'

const PAGINATION_LIMIT = 12

type CountriesFeedProps = {
    countries: ICountry[]
}

export const CountriesFeed = ({ countries }: CountriesFeedProps) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    const visibleCountries = countries.slice(0, currentPage * PAGINATION_LIMIT)

    return (
        <>
            <div className="md:grid-cols-3 lg:grid-cols-4 md:gap-8 mb-8 grid grid-cols-2 gap-4">
                {visibleCountries.map((country, index) => (
                    <Country key={index} {...country} />
                ))}
            </div>
            {currentPage * PAGINATION_LIMIT < countries.length && <ShowMore onClick={handleLoadMore} />}
        </>
    )
}
