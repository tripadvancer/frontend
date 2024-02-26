import { Suspense } from 'react'

import type { IPlace } from '@/utils/types/place'

import { ReviewsFeed } from '@/components/features/reviews-feed/reviews-feed'
import { ReviewsFeedSkeleton } from '@/components/features/reviews-feed/reviews-feed-skeleton'
import { getReviewsByPlaceId } from '@/services/reviews'
import { getI18n } from '@/utils/i18n/i18n.server'

import { PlaceMainAddReviewButton } from './place-main-add-review-button'

export const PlaceMainReviews = async ({ id, page = '1' }: IPlace & { page: string }) => {
    const t = await getI18n()
    const reviews = await getReviewsByPlaceId(id.toString(), page)

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="text-h5-m sm:text-h5" id="reviews">
                {t('pages.place.reviews.title')}
            </h2>
            <div className="flex flex-col gap-y-8">
                <PlaceMainAddReviewButton placeId={id} />
                <Suspense fallback={<ReviewsFeedSkeleton />}>
                    <ReviewsFeed reviews={reviews} currentPage={parseInt(page)} variant="place-page" />
                </Suspense>
            </div>
        </section>
    )
}
