import Link from 'next/link'

import { Rating } from '@/components/ui/rating'

type PlaceSidebarRatingProps = {
    avgRating: number | null
    reviewsCount: number
}

export const PlaceSidebarRating = async ({ avgRating, reviewsCount }: PlaceSidebarRatingProps) => {
    const reviewLabel = reviewsCount === 1 ? '1 review' : `${reviewsCount} reviews`

    return (
        <div className="flex flex-col gap-y-2.5">
            <Rating value={avgRating ?? 0} size={32} />
            <p className="text-small text-black-40">
                {reviewsCount && avgRating ? (
                    <>
                        <Link href="#reviews">{reviewLabel}</Link> with an average rating of {avgRating.toFixed(2)}
                    </>
                ) : (
                    'This place does not have a rating yet'
                )}
            </p>
        </div>
    )
}
