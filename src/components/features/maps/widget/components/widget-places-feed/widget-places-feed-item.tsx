'use client'

import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { IPlacePreview } from '@/utils/types/place'

import { WidgetPlacesFeedItemActions } from './widget-places-feed-item-actions'

export const WidgetPlacesFeedItem = (place: IPlacePreview) => {
    return (
        <div className="flex gap-x-4">
            <Link href={`places/${place.id}`} className="peer flex-none" target="_blank">
                <PlacePreviewCover
                    cover={place.cover}
                    title={place.title}
                    size={80}
                    className="aspect-square w-20 rounded-lg"
                />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between text-black-100 peer-hover:text-blue-active">
                <Link
                    href={`places/${place.id}`}
                    className="line-clamp-2 flex-none break-words font-medium text-inherit"
                    target="_blank"
                >
                    {place.title}
                </Link>
                <div className="flex items-center justify-between">
                    <PlacePreviewRating {...place} />
                    <WidgetPlacesFeedItemActions {...place} />
                </div>
            </div>
        </div>
    )
}
