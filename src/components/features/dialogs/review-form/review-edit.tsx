'use client'

import { useTranslations } from 'next-intl'

import { useDialog } from '@/providers/dialog-provider'
import { placesAPI } from '@/redux/services/places.api'
import { reviewsAPI } from '@/redux/services/reviews.api'
import { UpdateReviewInputs } from '@/redux/services/reviews.types'
import { IReview } from '@/utils/types/common'

import { ReviewForm } from './review-form'

export const ReviewEdit = (review: IReview) => {
    const t = useTranslations()
    const dialog = useDialog()

    const { data: meta, isSuccess } = placesAPI.useGetPlaceMetaByIdQuery(review.place.id)
    const [updateReview] = reviewsAPI.useUpdateReviewMutation()

    const initialValues: UpdateReviewInputs = {
        placeId: review.place.id,
        reviewId: review.id,
        userId: review.user.id,
        rating: review.rating,
        text: review.text,
        photos: review.photos.map(photo => photo.url),
        isVisited: isSuccess && meta.isVisited,
    }

    const handleSubmit = (inputs: UpdateReviewInputs) => {
        const trimmedInputs = {
            ...inputs,
            text: inputs.text.trim(),
        }
        updateReview(trimmedInputs)
        dialog.close()
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('dialog.reviewForm.title.edit')}</h1>
            <hr className="border-black-70" />
            <ReviewForm initialValues={initialValues} onSubmit={inputs => handleSubmit(inputs as UpdateReviewInputs)} />
        </div>
    )
}
