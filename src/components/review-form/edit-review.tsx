'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { IReview, UpdateReviewInputs } from '@/utils/types/review'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { updateReviewById } from '@/services/reviews'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ReviewForm } from './review-form'

type EditReviewProps = IReview

export const EditReview = (review: EditReviewProps) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        reviewId: review.id,
        rating: review.rating,
        text: review.text,
        photos: review.photos.map(photo => photo.url),
    }

    const handleSubmit = async (values: UpdateReviewInputs) => {
        try {
            setIsLoading(true)
            await updateReviewById(values)
            dialog.close()
            router.refresh()
            toast.success(t('success.edit_review'))
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="text-h7">{t('review.form.edit.title')}</h1>
            <hr className="border-black-70" />
            <ReviewForm
                initialValues={initialValues}
                isLoading={isLoading}
                onSubmit={values => handleSubmit(values as UpdateReviewInputs)}
            />
        </div>
    )
}
