'use client'

import { useState } from 'react'

import type { IPlacePreview } from '@/utils/types/place'

import { ShowMore } from '@/components/ui/show-more'
import { useI18n } from '@/utils/i18n/i18n.client'

import { CountryPlace } from './country-place'

const PAGINATION_LIMIT = 48

export const CountryPlaces = ({ places }: { places: IPlacePreview[] }) => {
    const t = useI18n()
    const [currentPage, setCurrentPage] = useState(1)
    const visiblePlaces = places.slice(0, currentPage * PAGINATION_LIMIT)

    const handleLoadMore = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }

    if (places.length === 0) {
        return <div className="text-center text-black-40">{t('common.empty_message.places')}</div>
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
