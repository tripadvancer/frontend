'use client'

import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { ImageVariants } from '@/utils/enums'

import { WidgetRandomPlaceActions } from './widget-random-place-actions'

export const WidgetRandomPlace = (place: IPlacePreview) => {
    return (
        <div className="flex flex-col gap-y-2">
            <Link href={`places/${place.id}`} className="link-black flex flex-col gap-y-2" target="_blank">
                <div className="w-full">
                    <PlacePreviewCover
                        cover={place.cover}
                        title={place.title}
                        imageVariant={ImageVariants.PUBLIC}
                        size={80}
                        className="aspect-video w-full rounded-lg"
                    />
                </div>
                <div className="break-words font-medium">{place.title}</div>
            </Link>
            <div className="flex items-center justify-between">
                <PlacePreviewRating {...place} />
                <WidgetRandomPlaceActions {...place} />
            </div>
        </div>
    )
}
