'use client'

import type { IPlace } from '@/utils/types/place'

import { Review } from '@/components/features/review/review'
import { ReviewSkeleton } from '@/components/features/review/review-skeleton'
import { placesAPI } from '@/redux/services/places-api'

import { PlaceMainAddReviewButton } from './place-main-add-review-button'

export const PlaceMainOwnReview = ({ place, isAuth }: { place: IPlace; isAuth: boolean }) => {
    const { data: meta, isLoading, isSuccess } = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !isAuth })

    if (isLoading) {
        return <ReviewSkeleton />
    }

    if (isSuccess && meta.ownReview) {
        return (
            <div className="rounded-lg bg-blue-10 p-4 sm:p-8">
                <Review review={meta.ownReview} variant="place-page" className="border-none !p-0" />
            </div>
        )
    }

    return <PlaceMainAddReviewButton placeId={place.id} />
}
