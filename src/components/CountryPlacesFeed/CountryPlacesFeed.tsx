'use client'

import { useState } from 'react'

import type { IPlacePreview } from '@/types/place'

import { ShowMore } from '@/components/ShowMore'
import { useScopedI18n } from '@/utils/i18n.client'

import { CountryPlace } from './CountryPlace'

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
        return <div className="text-black-40 text-center">{t('empty')}</div>
    }

    return (
        <>
            <div className="sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-8 mb-8 grid grid-cols-1 gap-4">
                {visiblePlaces.map((place, index) => (
                    <CountryPlace key={index} {...place} />
                ))}
            </div>
            {currentPage * PAGINATION_LIMIT < places.length && <ShowMore onClick={handleLoadMore} />}
        </>
    )
}
