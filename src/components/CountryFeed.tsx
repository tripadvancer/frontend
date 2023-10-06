'use client'

import { useState } from 'react'

import { CountryPreview } from '@/components/CountryPreview'
import { ShowMore } from '@/components/ShowMore'
import { i18nConfig } from '@/configs/i18n.config'
import { I18nProviderClient } from '@/utils/i18n.client'
import { ICountry } from '@/utils/interfaces'

const PAGINATION_LIMIT = 16

export const CountryFeed = ({ countries }: { countries: ICountry[] }) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    const visibleCountries = countries.slice(0, currentPage * PAGINATION_LIMIT)

    return (
        <I18nProviderClient>
            <div className="mb-8 grid grid-cols-4 gap-8 phone:grid-cols-2">
                {visibleCountries.map((country, index) => (
                    <CountryPreview key={index} {...country} />
                ))}
            </div>

            {currentPage * PAGINATION_LIMIT < countries.length && <ShowMore onClick={handleLoadMore} />}
        </I18nProviderClient>
    )
}
