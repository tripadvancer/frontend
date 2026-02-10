'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Review } from '@/components/features/common/review/review'
import { ReviewSkeleton } from '@/components/features/common/review/review-skeleton'
import { ShowMore } from '@/components/ui/show-more'
import { reviewsAPI } from '@/redux/services/reviews/reviews.api'

type PlaceMainReviewsFeedProps = {
    placeId: number
    activeUserId?: number
    isAuth: boolean
}

export const PlaceMainReviewsFeed = ({ placeId, activeUserId, isAuth }: PlaceMainReviewsFeedProps) => {
    const t = useTranslations()
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
                {t.rich('page.place.reviews.emptyMessage', { br: () => <br /> })}
            </div>
        )
    }

    if (isSuccess && reviews.items.length > 0) {
        return (
            <div className="flex flex-col gap-y-8">
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
            </div>
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
