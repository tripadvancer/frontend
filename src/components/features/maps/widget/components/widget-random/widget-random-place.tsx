'use client'

import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { ImageVariants } from '@/utils/enums'
import { getPlacePath } from '@/utils/helpers/places'

import { WidgetRandomPlaceActions } from './widget-random-place-actions'

type WidgetRandomPlaceProps = {
    id: number
    title: string
    description: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    isSaved: boolean
    coordinates: number[]
}

export const WidgetRandomPlace = (props: WidgetRandomPlaceProps) => {
    return (
        <div className="flex flex-col gap-y-2">
            <Link
                href={getPlacePath(props.id, props.countryCode)}
                className="link-black flex flex-col gap-y-2"
                target="_blank"
            >
                <div className="w-full">
                    <PlacePreviewCover
                        cover={props.cover}
                        title={props.title}
                        imageVariant={ImageVariants.PUBLIC}
                        size={80}
                        className="aspect-video w-full rounded-lg object-cover"
                    />
                </div>
                <div className="font-medium wrap-break-word">{props.title}</div>
            </Link>
            <div className="flex items-center justify-between">
                <PlacePreviewRating {...props} />
                <WidgetRandomPlaceActions {...props} />
            </div>
        </div>
    )
}
