'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'

import { WidgetPlacesFeedItem } from './widget-places-feed-item'

const PAGINATION_LIMIT = 10

type WidgetPlacesFeedProps = {
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
}

export const WidgetPlacesFeed = ({ places }: WidgetPlacesFeedProps) => {
    const t = useTranslations()
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className="flex flex-col gap-4">
            {places.slice(0, currentPage * PAGINATION_LIMIT).map(place => (
                <WidgetPlacesFeedItem key={`widget-place-${place.id}`} {...place} />
            ))}

            {places.length > currentPage * PAGINATION_LIMIT && (
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
