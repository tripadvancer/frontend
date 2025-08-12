'use client'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import * as Yup from 'yup'

import { FormButton } from '@/components/ui/form-button'
import { FormRatingInput } from '@/components/ui/form-rating-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { CreateReviewInputs, UpdateReviewInputs } from '@/redux/services/reviews/reviews.types'

import { ReviewFormIsVisited } from './components/review-form-is-visited'
import { ReviewFormPhotosList } from './components/review-form-photos-list'

const reviewTextMinLength = validationConfig.review.text.minLength
const reviewTextMaxLength = validationConfig.review.text.maxLength

type ReviewFormProps = {
    initialValues: CreateReviewInputs | UpdateReviewInputs
    isLoading?: boolean
    onSubmit: (values: CreateReviewInputs | UpdateReviewInputs) => void
}

export const ReviewForm = ({ initialValues, isLoading, onSubmit }: ReviewFormProps) => {
    const t = useTranslations()
    const dialog = useDialog()

    const validationSchema = Yup.object().shape({
        rating: Yup.number().min(1, t('validation.required')),
        text: Yup.string()
            .trim()
            .required(t('validation.required'))
            .min(reviewTextMinLength, t('validation.text.minLength', { minLength: reviewTextMinLength }))
            .max(reviewTextMaxLength, t('validation.text.maxLength', { maxLength: reviewTextMaxLength })),
    })

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit,
    })

    return (
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('dialog.reviewForm.field.rating.label')}
                    </label>
                    <FormRatingInput
                        value={formik.values.rating}
                        error={formik.errors.rating}
                        isDisabled={isLoading}
                        onChange={value => formik.setFieldValue('rating', value)}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('dialog.reviewForm.field.text.label')}
                    </label>
                    <FormTextarea
                        id="text"
                        name="text"
                        value={formik.values.text}
                        placeholder={t('dialog.reviewForm.field.text.placeholder')}
                        maxLength={reviewTextMaxLength}
                        style={{ height: '120px' }}
                        error={formik.errors.text}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('dialog.reviewForm.field.photos.label')}
                    </label>
                    <ReviewFormPhotosList
                        photos={formik.values.photos}
                        isDisabled={isLoading}
                        onChange={value => formik.setFieldValue('photos', value)}
                    />
                </div>
            </div>
            <ReviewFormIsVisited
                isVisited={formik.values.isVisited}
                isLoading={isLoading}
                onChange={value => formik.setFieldValue('isVisited', value)}
            />
            <div className="flex gap-x-2">
                <FormButton htmlType="submit" isLoading={isLoading} isDisabled={!formik.dirty}>
                    {t('common.action.save')}
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    {t('common.action.close')}
                </FormButton>
            </div>
        </form>
    )
}
