'use client'

import { useRouter } from 'next/navigation'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { reviewsAPI } from '@/utils/redux/services/reviews/reviews.api'
import { UpdateReviewInputs } from '@/utils/redux/services/reviews/reviews.types'
import { IReview } from '@/utils/types/common'

import { ReviewForm } from './review-form'
import { ReviewFormSkeleton } from './review-form-skeleton'

export const ReviewEdit = (review: IReview) => {
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const {
        data: meta,
        isLoading: isMetaLoading,
        isError: isMetaError,
    } = placesAPI.useGetPlaceMetaByIdQuery(review.place.id)

    const [updateReview, { isLoading }] = reviewsAPI.useUpdateReviewMutation()

    if (isMetaLoading) {
        return (
            <div className="flex w-full flex-col gap-y-4 sm:w-104">
                <h1 className="h7">Edit review</h1>
                <hr className="border-black-70" />
                <ReviewFormSkeleton />
            </div>
        )
    }

    if (isMetaError) {
        return <div>An unexpected error has occurred. Please try again later.</div>
    }

    const initialValues: UpdateReviewInputs = {
        placeId: review.place.id,
        reviewId: review.id,
        userId: review.user.id,
        rating: review.rating,
        text: review.text,
        photos: review.photos.map(photo => photo.url),
        isVisited: meta?.isVisited ?? false,
    }

    const handleSubmit = async (inputs: UpdateReviewInputs) => {
        try {
            const trimmedInputs = {
                ...inputs,
                text: inputs.text.trim(),
            }
            await updateReview(trimmedInputs).unwrap()
            router.refresh()
            dialog.close()
        } catch (error) {
            toast.error('An unexpected error has occurred. Please try again later.')
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">Edit review</h1>
            <hr className="border-black-70" />
            <ReviewForm
                initialValues={initialValues}
                isLoading={isLoading}
                onSubmit={inputs => handleSubmit(inputs as UpdateReviewInputs)}
            />
        </div>
    )
}
