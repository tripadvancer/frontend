'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import { IReview } from '@/utils/types/review'

import { ButtonStroke } from '@/components/button-stroke'
import { Button } from '@/components/forms/button/button'
import { RatingInput } from '@/components/forms/rating-input/rating-input'
import { Textarea } from '@/components/forms/textarea/textarea'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { updateReviewById } from '@/services/reviews'
import { useI18n, useScopedI18n } from '@/utils/i18n/i18n.client'

const reviewTextMinLength = validationConfig.review.text.minLength
const reviewTextMaxLength = validationConfig.review.text.maxLength

type ReviewFormProps = IReview

export const ReviewForm = (review: ReviewFormProps) => {
    const t = useI18n()
    const tValidation = useScopedI18n('forms.validation')
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            reviewId: review.id,
            rating: review.rating || 0,
            text: review.text || '',
        },
        validationSchema: Yup.object().shape({
            rating: Yup.number().min(1, t('forms.validation.required')),
            text: Yup.string()
                .required(tValidation('required'))
                .min(reviewTextMinLength, tValidation('min_length', { min_length: reviewTextMinLength }))
                .max(reviewTextMaxLength, tValidation('max_length', { max_length: reviewTextMaxLength })),
        }),
        onSubmit: async values => {
            try {
                setIsLoading(true)
                await updateReviewById(values)
                dialog.close()
                router.refresh()
                toast.success(t('review.edit.success'))
            } catch (err: any) {
                toast.error(err.message)
            } finally {
                setIsLoading(false)
            }
        },
    })

    return (
        <form className="w-full sm:w-104" onSubmit={formik.handleSubmit}>
            <div className="mb-8 flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        Your rating
                    </label>
                    <RatingInput
                        value={formik.values.rating}
                        size={32}
                        error={formik.errors.rating}
                        onChange={value => formik.setFieldValue('rating', value)}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        Review
                    </label>
                    <Textarea
                        id="text"
                        name="text"
                        value={formik.values.text}
                        placeholder="Share your impressions in detail — this way you will help others learn more about this place"
                        maxLength={reviewTextMaxLength}
                        error={formik.errors.text}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="flex gap-x-2">
                <Button type="submit" isLoading={isLoading}>
                    {t('common.action.send')}
                </Button>
                <ButtonStroke onClick={() => dialog.close()}>{t('common.action.cancel')}</ButtonStroke>
            </div>
        </form>
    )
}
