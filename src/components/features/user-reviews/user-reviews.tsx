'use client'

import { useState } from 'react'

import { Review } from '@/components/features/review/review'
import { ShowMore } from '@/components/ui/show-more'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { UserReviewsSkeleton } from './user-reviews-skeleton'

export const UserReviews = ({ userId }: { userId: number }) => {
    const t = useI18n()
    const [page, setPage] = useState(1)

    const { data: reviews, isFetching, isSuccess, isError } = reviewsAPI.useGetReviewsByUserIdQuery({ userId, page })

    if (isError) {
        return <div className="text-center text-black-40">{t('common.error')}</div>
    }

    if (isSuccess && reviews.items.length === 0) {
        return <div className="text-center text-black-40">{t('common.empty_message.reviews')}</div>
    }

    if (isSuccess && reviews.items.length > 0) {
        return (
            <div className="flex flex-col gap-y-8">
                {reviews.items.map((review, index) => (
                    <Review key={index} review={review} variant="user-page" />
                ))}

                {reviews.totalPages > page && (
                    <ShowMore isLoading={isFetching} onClick={() => setPage(prev => prev + 1)} />
                )}
            </div>
        )
    }

    return <UserReviewsSkeleton />
}
