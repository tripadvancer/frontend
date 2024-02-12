'use client'

import type { IPlacePreview } from '@/utils/types/place'

import { PlacePreviewActions } from '@/components/ui/place-preview-actions'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'

export const WidgetPlacePreview = (place: IPlacePreview) => {
    return (
        <div className="flex gap-x-4">
            <PlacePreviewCover {...place} />
            <div className="flex flex-1 flex-col justify-between">
                <div className="line-clamp-4 break-words font-medium">{place.title}</div>
                <div className="flex items-center justify-between">
                    <PlacePreviewRating {...place} />
                    <PlacePreviewActions {...place} />
                </div>
            </div>
        </div>
    )
}
