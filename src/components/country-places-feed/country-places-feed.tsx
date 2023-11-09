'use client'

import { useState } from 'react'

import type { IPlacePreview } from '@/utils/types/place'

import { ShowMore } from '@/components/show-more'
import { useScopedI18n } from '@/utils/i18n/i18n.client'

import { CountryPlace } from './country-place'

type CountryPlacesFeedProps = {
    places: IPlacePreview[]
}

const PAGINATION_LIMIT = 48

export const CountryPlacesFeed = ({ places }: CountryPlacesFeedProps) => {
    const t = useScopedI18n('common.places')
    const [currentPage, setCurrentPage] = useState(1)
    const visiblePlaces = places.slice(0, currentPage * PAGINATION_LIMIT)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    if (places.length === 0) {
        return <div className="text-center text-black-40">{t('empty')}</div>
    }

    return (
        <>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8">
                {visiblePlaces.map((place, index) => (
                    <CountryPlace key={index} {...place} />
                ))}
            </div>
            {currentPage * PAGINATION_LIMIT < places.length && <ShowMore onClick={handleLoadMore} />}
        </>
    )
}
