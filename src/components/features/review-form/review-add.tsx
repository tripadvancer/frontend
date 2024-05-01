'use client'

import { useRouter } from 'next/navigation'

import type { CreateReviewInputs } from '@/utils/types/review'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ReviewForm } from './review-form'

export const ReviewAdd = ({ placeId, userId }: { placeId: number; userId: number }) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [createReview, { isLoading }] = reviewsAPI.useCreateReviewMutation()

    const initialValues: CreateReviewInputs = {
        placeId,
        userId,
        rating: 0,
        text: '',
        photos: [],
    }

    const handleSubmit = async (inputs: CreateReviewInputs) => {
        try {
            await createReview(inputs)
            dialog.close()
            router.refresh()
            toast.success(t('success.create_review'))
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('review.form.add.title')}</h1>
            <hr className="border-black-70" />
            <ReviewForm
                initialValues={initialValues}
                isLoading={isLoading}
                onSubmit={inputs => handleSubmit(inputs as CreateReviewInputs)}
            />
        </div>
    )
}
