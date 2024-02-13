'use client'

import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { PlacePreviewActions } from '@/components/ui/place-preview-actions'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'

export const WidgetPlacePreview = (place: IPlacePreview) => {
    return (
        <div className="group flex gap-x-4">
            <Link href={`places/${place.id}`} target="_blank">
                <PlacePreviewCover {...place} />
            </Link>
            <div className="flex flex-1 flex-col justify-between">
                <Link
                    href={`places/${place.id}`}
                    className="link-black line-clamp-4 break-words font-medium group-hover:text-blue-active"
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
