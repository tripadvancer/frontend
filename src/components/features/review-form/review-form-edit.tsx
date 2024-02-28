'use client'

import { useRouter } from 'next/navigation'

import type { EditReviewInputs, IReview } from '@/utils/types/review'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ReviewForm } from './review-form'

export const ReviewFormEdit = (review: IReview) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [editReview, { isLoading }] = reviewsAPI.useEditReviewMutation()

    const initialValues = {
        placeId: review.place.id,
        reviewId: review.id,
        rating: review.rating,
        text: review.text,
        photos: review.photos.map(photo => photo.url),
    }

    const handleSubmit = (inputs: EditReviewInputs) => {
        editReview(inputs)
            .unwrap()
            .then(() => {
                dialog.close()
                router.refresh()
                toast.success(t('success.edit_review'))
            })
            .catch(() => {
                toast.error(t('common.error'))
            })
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="text-h7">{t('review.form.edit.title')}</h1>
            <hr className="border-black-70" />
            <ReviewForm
                initialValues={initialValues}
                isLoading={isLoading}
                onSubmit={inputs => handleSubmit(inputs as EditReviewInputs)}
            />
        </div>
    )
}
