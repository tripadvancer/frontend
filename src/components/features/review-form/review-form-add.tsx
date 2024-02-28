'use client'

import { useRouter } from 'next/navigation'

import type { AddReviewInputs } from '@/utils/types/review'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ReviewForm } from './review-form'

type AddReviewProps = {
    placeId: number
}

export const ReviewformAdd = ({ placeId }: AddReviewProps) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [addReview, { isLoading }] = reviewsAPI.useAddReviewMutation()

    const initialValues = {
        placeId,
        rating: 0,
        text: '',
        photos: [],
    }

    const handleSubmit = (inputs: AddReviewInputs) => {
        addReview(inputs)
            .unwrap()
            .then(() => {
                dialog.close()
                router.refresh()
                toast.success(t('success.create_review'))
            })
            .catch(() => {
                toast.error(t('common.error'))
            })
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="text-h7">{t('review.form.add.title')}</h1>
            <hr className="border-black-70" />
            <ReviewForm
                initialValues={initialValues}
                isLoading={isLoading}
                onSubmit={inputs => handleSubmit(inputs as AddReviewInputs)}
            />
        </div>
    )
}
