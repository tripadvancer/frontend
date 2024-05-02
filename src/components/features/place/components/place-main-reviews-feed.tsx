'use client'

import { useState } from 'react'

import { Review } from '@/components/features/review/review'
import { ReviewSkeleton } from '@/components/features/review/review-skeleton'
import { ShowMore } from '@/components/ui/show-more'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

type PlaceMainReviewsFeedProps = {
    placeId: number
    activeUserId?: number
    isAuth: boolean
}

export const PlaceMainReviewsFeed = ({ placeId, activeUserId, isAuth }: PlaceMainReviewsFeedProps) => {
    const t = useI18n()
    const [cursor, setCursor] = useState<number>()

    const {
        data: reviews,
        isFetching,
        isSuccess,
        isError,
    } = reviewsAPI.useGetReviewsByPlaceIdQuery({ placeId, cursor })

    if (isError) {
        return <div className="border-y border-black-15 py-8 text-center text-black-40">{t('common.error')}</div>
    }

    if (isSuccess && reviews.items.length === 0) {
        return (
            <div className="border-y border-black-15 py-8 text-center text-black-40">
                {t('common.empty_message.reviews')}
            </div>
        )
    }

    if (isSuccess && reviews.items.length > 0) {
        return (
            <>
                <div>
                    {reviews.items.map(review => (
                        <Review
                            key={`place-review-${review.id}`}
                            review={review}
                            variant="place-page"
                            activeUserId={activeUserId}
                            isAuth={isAuth}
                        />
                    ))}
                </div>

                {reviews.items.length < reviews.total && (
                    <ShowMore
                        isLoading={isFetching}
                        onClick={() => setCursor(reviews.items[reviews.items.length - 1].id)}
                    />
                )}
            </>
        )
    }

    return (
        <div>
            {Array.from({ length: 3 }).map((_, index) => (
                <ReviewSkeleton key={`place-review-skeleton-${index}`} />
            ))}
        </div>
    )
}
