'use client'

import { ChangeEvent, useState } from 'react'

import { Review } from '@/components/features/common/review/review'
import { ReviewSkeleton } from '@/components/features/common/review/review-skeleton'
import { FormCheckbox } from '@/components/ui/form-checkbox'
import { ShowMore } from '@/components/ui/show-more'
import { reviewsAPI } from '@/utils/redux/services/reviews/reviews.api'

type PlaceMainReviewsFeedProps = {
    placeId: number
    activeUserId?: number
    isAuth: boolean
}

export const PlaceMainReviewsFeed = ({ placeId, activeUserId, isAuth }: PlaceMainReviewsFeedProps) => {
    const [cursor, setCursor] = useState<number>()
    const [withPhotos, setWithPhotos] = useState(false)

    const {
        data: reviews,
        isFetching,
        isSuccess,
        isError,
    } = reviewsAPI.useGetReviewsByPlaceIdQuery({ placeId, cursor, withPhotos })

    const handleWithPhotosChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCursor(undefined)
        setWithPhotos(event.target.checked)
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex justify-end">
                <FormCheckbox
                    id="reviews-with-photos"
                    label="With photos"
                    checked={withPhotos}
                    onChange={handleWithPhotosChange}
                />
            </div>

            {isError && (
                <div className="border-y border-black-15 py-8 text-center text-black-40">
                    An unexpected error has occurred. Please try again later.
                </div>
            )}

            {isSuccess && reviews.items.length === 0 && (
                <div className="border-y border-black-15 py-8 text-center text-black-40">
                    Do you know this place?
                    <br />
                    Other users will appreciate your review!
                </div>
            )}

            {isSuccess && reviews.items.length > 0 && (
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
            )}

            {!isError && !isSuccess && (
                <div>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <ReviewSkeleton key={`place-review-skeleton-${index}`} />
                    ))}
                </div>
            )}
        </div>
    )
}
