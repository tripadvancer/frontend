'use client'

import { Rating } from '@/components/ui/rating'

type PlacePreviewRatingProps = {
    avgRating: number | null
    reviewsCount: number
}

export const PlacePreviewRating = ({ avgRating, reviewsCount }: PlacePreviewRatingProps) => {
    return (
        <div>
            <Rating value={avgRating ?? 0} size={16} />
            <div className="text-small text-black-40">
                {reviewsCount === 0 ? 'No reviews' : reviewsCount === 1 ? '1 review' : `${reviewsCount} reviews`}
            </div>
        </div>
    )
}
