import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewDistance } from '@/components/ui/place-preview-distance'
import { PlacePreviewMeta } from '@/components/ui/place-preview-meta'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'

type UserPlacesItemProps = {
    id: number
    title: string
    cover: string | null
    rating?: {
        avgRating: number | null
        reviewsCount: number
    }
    meta?: {
        countryCode: string | null
        createdAt: Date
    }
    distance?: number
}

export const PlacesGridItem = ({ id, title, cover, rating, meta, distance }: UserPlacesItemProps) => {
    return (
        <div className="space-y-1">
            <Link href={`/places/${id}`} className="text-black-100">
                <div className="mb-2 flex-none">
                    <PlacePreviewCover
                        cover={cover}
                        title={title}
                        size={192}
                        className="aspect-square w-full rounded-2xl"
                    />
                </div>
                <div className="line-clamp-3 break-words font-medium">{title}</div>
            </Link>

            {rating && <PlacePreviewRating avgRating={rating.avgRating} reviewsCount={rating.reviewsCount} />}
            {meta && <PlacePreviewMeta countryCode={meta.countryCode} createdAt={meta.createdAt} />}
            {distance && <PlacePreviewDistance distance={distance} />}
        </div>
    )
}
