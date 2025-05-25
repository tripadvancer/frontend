'use client'

import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'

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
            <Link href={`/places/${props.id}`} className="peer flex-none" target="_blank">
                <PlacePreviewCover
                    cover={props.cover}
                    title={props.title}
                    size={80}
                    className="aspect-square w-20 rounded-lg"
                />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between text-black-100 peer-hover:text-blue-active">
                <Link
                    href={`/places/${props.id}`}
                    className="line-clamp-2 flex-none break-words font-medium text-inherit"
                    target="_blank"
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
