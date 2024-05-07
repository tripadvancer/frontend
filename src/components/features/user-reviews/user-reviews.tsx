'use client'

import { useState } from 'react'

import { Review } from '@/components/features/review/review'
import { ShowMore } from '@/components/ui/show-more'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { UserReviewsSkeleton } from './user-reviews-skeleton'

type UserReviewsProps = {
    userId: number
    activeUserId?: number
    isAuth: boolean
}

export const UserReviews = ({ userId, activeUserId, isAuth }: UserReviewsProps) => {
    const t = useI18n()
    const [cursor, setCursor] = useState<number>()

    const { data: reviews, isFetching, isSuccess, isError } = reviewsAPI.useGetReviewsByUserIdQuery({ userId, cursor })

    if (isError) {
        return <div className="text-center text-black-40">{t('common.error')}</div>
    }

    if (isSuccess && reviews.items.length === 0) {
        return <div className="text-center text-black-40">{t('common.empty_message.reviews')}</div>
    }

    if (isSuccess && reviews.items.length > 0) {
        return (
            <div className="flex flex-col gap-y-8">
                <div>
                    {reviews.items.map(review => (
                        <Review
                            key={`user-review-${review.id}`}
                            review={review}
                            variant="user-page"
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

    return <UserReviewsSkeleton />
}
