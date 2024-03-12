'use client'

import { Review } from '@/components/features/review/review'
import { ReviewSkeleton } from '@/components/features/review/review-skeleton'
import { placesAPI } from '@/redux/services/places-api'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { PlaceMainAddReviewButton } from './place-main-add-review-button'

export const PlaceMainOwnReview = ({ placeId }: { placeId: number }) => {
    const supertokens = useSupertokens()
    const response = placesAPI.useGetPlaceMetaByIdQuery(placeId, { skip: !supertokens.isAuth })

    if (response.isLoading) {
        return <ReviewSkeleton />
    }

    if (response.isSuccess) {
        if (response.data.ownReview) {
            return (
                <div className="rounded-lg bg-blue-10 p-4 sm:p-8">
                    <Review review={response.data.ownReview} variant="place-page" className="border-none !p-0" />
                </div>
            )
        }

        return <PlaceMainAddReviewButton placeId={placeId} />
    }

    return null
}
