'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'

import { PlacesFeedItem } from './places-feed-item'

type PlacesFeedProps = {
    places: {
        id: number
        title: string
        cover: string | null
        avgRating: number | null
        reviewsCount: number
        countryCode: string | null
        isVisited: boolean
        isSaved: boolean
        coordinates: number[]
    }[]
    paginationLimit: number
}

export const PlacesFeed = ({ places, paginationLimit }: PlacesFeedProps) => {
    const t = useTranslations()
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className="flex flex-col gap-4">
            {places.slice(0, currentPage * paginationLimit).map(place => (
                <PlacesFeedItem key={`places-feed-item-${place.id}`} {...place} />
            ))}

            {places.length > currentPage * paginationLimit && (
                <FormButton
                    type="stroke"
                    size="small"
                    shape="rounded"
                    className="flex-grow"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    {t('common.action.loadMore')}
                </FormButton>
            )}
        </div>
    )
}
