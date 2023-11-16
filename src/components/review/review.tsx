import Link from 'next/link'

import type { IReview } from '@/utils/types/review'

import { PhotoFeed } from '@/components/photo-feed'
import { Rating } from '@/components/rating'
import { FormattedDate } from '@/utils/helpers'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

import { ReviewActions } from './review-actions'

type ReviewProps = {
    review: IReview
    reviewsCount: number
}

export const Review = ({ review, reviewsCount }: ReviewProps) => {
    const locale = getCurrentLocale()
    const formattedDate = FormattedDate(review.createdAt, locale)

    return (
        <div className="border-b border-black-15 py-8 first:border-t last:border-b-0 last:pb-0">
            <div className="mb-5 flex items-start justify-between sm:items-center">
                <div className="flex flex-col gap-1">
                    <Rating value={review.rating} size={16} />
                    <div className="flex flex-col gap-y-1 sm:flex-row sm:gap-x-2 ">
                        <Link href={`/places/${review.place.id}`} className="text-small-bold text-black-70">
                            {review.place.title}
                        </Link>
                        <div className="text-small text-black-40">{formattedDate}</div>
                    </div>
                </div>
                <ReviewActions review={review} reviewsCount={reviewsCount} />
            </div>

            <div>{review.text}</div>

            {review.photos.length > 0 && (
                <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-9">
                    <PhotoFeed
                        photos={review.photos}
                        title={review.place.title}
                        description={review.user.name}
                        size={64}
                    />
                </div>
            )}
        </div>
    )
}
