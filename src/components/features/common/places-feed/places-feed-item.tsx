'use client'

import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { getPlacePath } from '@/utils/helpers/places'

import { PlacesFeedItemActions } from './places-feed-item-actions'

type PlacesFeedItemProps = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    isVisited: boolean
    isSaved: boolean
    coordinates: number[]
}

export const PlacesFeedItem = (props: PlacesFeedItemProps) => {
    return (
        <div className="relative flex gap-x-4">
            <Link
                href={getPlacePath(props.id, props.countryCode)}
                className="peer flex-none"
                target="_blank"
                rel="noopener noreferrer"
            >
                <PlacePreviewCover
                    cover={props.cover}
                    title={props.title}
                    size={80}
                    className="aspect-square w-20 rounded-lg"
                />
            </Link>
            <div className="text-black-100 peer-hover:text-blue-active flex min-w-0 flex-1 flex-col justify-between">
                <Link
                    href={getPlacePath(props.id, props.countryCode)}
                    className="line-clamp-2 flex-none font-medium wrap-break-word text-inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {props.title}
                </Link>
                <div className="flex items-center justify-between">
                    <PlacePreviewRating {...props} />
                    <PlacesFeedItemActions {...props} />
                </div>
            </div>
        </div>
    )
}
