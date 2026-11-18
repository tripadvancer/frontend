import { ReactNode } from 'react'

import classNames from 'classnames'

import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewDistance } from '@/components/ui/place-preview-distance'
import { PlacePreviewMeta } from '@/components/ui/place-preview-meta'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { getPlacePath } from '@/utils/helpers/places'

type UserPlacesItemProps = {
    id: number
    title: string
    cover: string | null
    countryCode?: string | null
    rating?: {
        avgRating: number | null
        reviewsCount: number
    }
    meta?: {
        countryCode: string | null
        createdAt: Date
    }
    distance?: number
    actions?: ReactNode
    // Rendered over the top left corner of the cover
    tag?: ReactNode
    isMuted?: boolean
}

export const PlacesGridItem = ({
    id,
    title,
    cover,
    countryCode,
    rating,
    meta,
    distance,
    actions,
    tag,
    isMuted,
}: UserPlacesItemProps) => {
    return (
        <div className="relative space-y-1">
            <Link
                href={getPlacePath(id, countryCode ?? meta?.countryCode)}
                className={classNames('text-black-100', { 'opacity-60': isMuted })}
            >
                <div className="mb-2 flex-none">
                    <PlacePreviewCover
                        cover={cover}
                        title={title}
                        size={192}
                        className="aspect-square w-full rounded-2xl"
                    />
                </div>
                <div className="line-clamp-3 font-medium wrap-break-word">{title}</div>
            </Link>

            {tag && <div className="absolute top-2 left-2 z-10">{tag}</div>}
            {actions}

            {rating && <PlacePreviewRating avgRating={rating.avgRating} reviewsCount={rating.reviewsCount} />}
            {meta && <PlacePreviewMeta countryCode={meta.countryCode} createdAt={meta.createdAt} />}
            {distance && <PlacePreviewDistance distance={distance} />}
        </div>
    )
}
