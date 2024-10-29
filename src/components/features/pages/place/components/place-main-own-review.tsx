'use client'

import { Review } from '@/components/features/common/review/review'
import { ReviewSkeleton } from '@/components/features/common/review/review-skeleton'
import { placesAPI } from '@/redux/services/places-api'
import { IPlace } from '@/utils/types/place'

import { PlaceMainAddReviewButton } from './place-main-add-review-button'

type PlaceMainOwnReviewProps = {
    place: IPlace
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const PlaceMainOwnReview = ({ place, activeUserId, isAuth, isEmailVerified }: PlaceMainOwnReviewProps) => {
    const { data: meta, isLoading, isSuccess } = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !isAuth })

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
            placeId={place.id}
            activeUserId={activeUserId}
            isAuth={isAuth}
            isEmailVerified={isEmailVerified}
        />
    )
}
