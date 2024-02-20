'use client'

import { useState } from 'react'

import type { IPlacePreview } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'

import { WidgetPlacePreview } from './widget-place-preview'

const PAGINATION_LIMIT = 10

export const WidgetPlacesFeed = ({ places }: { places: IPlacePreview[] }) => {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className="flex flex-col gap-4">
            {places.slice(0, currentPage * PAGINATION_LIMIT).map(place => (
                <WidgetPlacePreview key={`widget-place-${place.id}`} {...place} />
            ))}

            {places.length > currentPage * PAGINATION_LIMIT && (
                <FormButton
                    type="stroke"
                    size="small"
                    shape="rounded"
                    className="flex-grow"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Load more ...
                </FormButton>
            )}
        </div>
    )
}
