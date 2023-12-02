import { Suspense } from 'react'

import type { IPlace } from '@/utils/types/place'

import { ReviewsFeed } from '@/components/reviews-feed/reviews-feed'
import { ReviewsFeedSkeleton } from '@/components/reviews-feed/reviews-feed-skeleton'
import { getReviewsByPlaceId } from '@/services/reviews'
import { getI18n } from '@/utils/i18n/i18n.server'

import { AddReviewButton } from './add-review-button'

type ReviewsProps = IPlace & {
    page: string
}

export const Reviews = async ({ id, isReviewed, page }: ReviewsProps) => {
    const t = await getI18n()
    const currentPage = page ?? '1'

    const reviews = await getReviewsByPlaceId(id.toString(), currentPage)

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="text-h5-m sm:text-h5" id="reviews">
                {t('pages.place.reviews.title')}
            </h2>
            <div className="flex flex-col gap-y-8">
                <AddReviewButton placeId={id} isDisabled={isReviewed} />
                <Suspense fallback={<ReviewsFeedSkeleton />}>
                    <ReviewsFeed reviews={reviews} currentPage={parseInt(currentPage)} variant="place-page" />
                </Suspense>
            </div>
        </section>
    )
}
