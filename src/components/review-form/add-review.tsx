'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { CreateReviewInputs } from '@/utils/types/review'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { createReview } from '@/services/reviews'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ReviewForm } from './review-form'

type AddReviewProps = {
    placeId: number
}

export const AddReview = ({ placeId }: AddReviewProps) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (values: CreateReviewInputs) => {
        try {
            setIsLoading(true)
            await createReview(values)
            dialog.close()
            router.refresh()
            toast.success(t('review.add.success'))
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="text-h7">{t('review.form.add.title')}</h1>
            <hr className="border-black-70" />
            <ReviewForm
                initialValues={{
                    placeId,
                    rating: 0,
                    text: '',
                    photos: [],
                }}
                isLoading={isLoading}
                onSubmit={values => handleSubmit(values as CreateReviewInputs)}
            />
        </div>
    )
}
