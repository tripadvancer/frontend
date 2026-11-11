'use client'

import { useState } from 'react'

import { Review } from '@/components/features/common/review/review'
import { ShowMore } from '@/components/ui/show-more'
import { reviewsAPI } from '@/utils/redux/services/reviews/reviews.api'

import { UserReviewsSkeleton } from './user-reviews-skeleton'

type UserReviewsProps = {
    userId: number
    activeUserId?: number
    isAuth: boolean
}

export const UserReviews = ({ userId, activeUserId, isAuth }: UserReviewsProps) => {
    const [cursor, setCursor] = useState<number>()

    const { data: reviews, isFetching, isSuccess, isError } = reviewsAPI.useGetReviewsByUserIdQuery({ userId, cursor })

    if (isError) {
        return (
            <div className="mt-16 text-center text-black-40">
                An unexpected error has occurred. Please try again later.
            </div>
        )
    }

    if (isSuccess && reviews.items.length === 0) {
        return (
            <div className="mt-16 text-center text-black-40">
                {
                    <>
                        Nothing has been added here yet.
                        <br />
                        Reviews will show up as they’re written.
                    </>
                }
            </div>
        )
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
