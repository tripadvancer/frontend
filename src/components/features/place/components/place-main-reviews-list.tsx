'use client'

import { useState } from 'react'

import { Review } from '@/components/features/review/review'
import { ReviewSkeleton } from '@/components/features/review/review-skeleton'
import { ShowMore } from '@/components/ui/show-more'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceMainReviewsList = ({ placeId }: { placeId: number }) => {
    const t = useI18n()
    const [page, setPage] = useState(1)
    const response = reviewsAPI.useGetReviewsByPlaceIdQuery({ placeId, page })

    if (response.isError) {
        return <div className="border-y border-black-15 py-8 text-center text-black-40">{t('common.error')}</div>
    }

    if (response.isSuccess && response.data.items.length === 0) {
        return (
            <div className="border-y border-black-15 py-8 text-center text-black-40">
                {t('common.empty_message.reviews')}
            </div>
        )
    }

    if (response.isSuccess && response.data.items.length > 0) {
        return (
            <div className="flex flex-col gap-y-8">
                {response.data.items.map((review, index) => (
                    <Review key={index} review={review} variant="place-page" />
                ))}

                {response.data.totalPages > page && (
                    <ShowMore isLoading={response.isFetching} onClick={() => setPage(prev => prev + 1)} />
                )}
            </div>
        )
    }

    return (
        <div>
            {Array.from({ length: 3 }).map((_, index) => (
                <ReviewSkeleton key={index} />
            ))}
        </div>
    )
}
