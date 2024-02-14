'use client'

import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { PlacePreviewActions } from '@/components/ui/place-preview-actions'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'

export const WidgetPlacePreview = (place: IPlacePreview) => {
    return (
        <div className="flex gap-x-4">
            <Link href={`places/${place.id}`} className="peer" target="_blank">
                <PlacePreviewCover {...place} />
            </Link>
            <div className="flex flex-1 flex-col justify-between text-black-100 peer-hover:text-blue-active">
                <Link
                    href={`places/${place.id}`}
                    className="line-clamp-4 break-words font-medium text-inherit"
                    target="_blank"
                >
                    {place.title}
                </Link>
                <div className="flex items-center justify-between">
                    <PlacePreviewRating {...place} />
                    <PlacePreviewActions {...place} />
                </div>
            </div>
        </div>
    )
}
