'use client'

import { useTranslations } from 'next-intl'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { reviewsAPI } from '@/redux/services/reviews.api'
import { CreateReviewInputs } from '@/redux/services/reviews.types'

import { ReviewForm } from './review-form'

type ReviewAddProps = {
    placeId: number
    userId: number
}

export const ReviewAdd = ({ placeId, userId }: ReviewAddProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const [createReview, { isLoading }] = reviewsAPI.useCreateReviewMutation()

    const initialValues: CreateReviewInputs = {
        placeId,
        userId,
        rating: 0,
        text: '',
        photos: [],
        isVisited: true,
    }

    const handleSubmit = async (inputs: CreateReviewInputs) => {
        try {
            const trimmedInputs = {
                ...inputs,
                text: inputs.text.trim(),
            }
            createReview(trimmedInputs)
            dialog.close()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="space-y-4 sm:w-104">
            <h1 className="h7">{t('dialog.reviewForm.title.add')}</h1>
            <hr className="border-black-70" />
            <ReviewForm
                initialValues={initialValues}
                isLoading={isLoading}
                onSubmit={inputs => handleSubmit(inputs as CreateReviewInputs)}
            />
        </div>
    )
}
