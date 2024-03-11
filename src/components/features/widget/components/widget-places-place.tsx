'use client'

import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { PlacePreviewActions } from '@/components/ui/place-preview-actions'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'

export const WidgetPlacesPlace = (place: IPlacePreview) => {
    return (
        <div className="flex gap-x-4">
            <Link href={`places/${place.id}`} className="peer flex-none" target="_blank">
                <PlacePreviewCover {...place} size={80} />
            </Link>
            <div className="flex flex-1 flex-col justify-between overflow-hidden text-black-100 peer-hover:text-blue-active">
                <Link
                    href={`places/${place.id}`}
                    className="line-clamp-2 break-words font-medium text-inherit"
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
