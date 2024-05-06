'use client'

import { useState } from 'react'

import type { IPlacePreview } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetPlacesFeedItem } from './widget-places-feed-item'

const PAGINATION_LIMIT = 10

export const WidgetPlacesFeed = ({ places }: { places: IPlacePreview[] }) => {
    const t = useI18n()
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
                    {t('common.action.load_more')}
                </FormButton>
            )}
        </div>
    )
}
