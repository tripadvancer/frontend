'use client'

import { Review } from '@/components/features/common/review/review'
import { ReviewSkeleton } from '@/components/features/common/review/review-skeleton'
import { placesAPI } from '@/redux/services/places/places.api'

import { PlaceMainAddReviewButton } from './place-main-add-review-button'

type PlaceMainOwnReviewProps = {
    placeId: number
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const PlaceMainOwnReview = ({ placeId, activeUserId, isAuth, isEmailVerified }: PlaceMainOwnReviewProps) => {
    const { data: meta, isLoading, isSuccess } = placesAPI.useGetPlaceMetaByIdQuery(placeId, { skip: !isAuth })

    if (isLoading) {
        return <ReviewSkeleton />
    }

    if (isSuccess && meta.ownReview) {
        return (
            <div className="rounded-lg bg-blue-10 p-4 sm:p-8">
                <Review
                    review={meta.ownReview}
                    variant="place-page"
                    className="border-none !p-0"
                    activeUserId={activeUserId}
                    isAuth={isAuth}
                />
            </div>
        )
    }

    return (
        <PlaceMainAddReviewButton
            placeId={placeId}
            activeUserId={activeUserId}
            isAuth={isAuth}
            isEmailVerified={isEmailVerified}
        />
    )
}
