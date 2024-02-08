'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { CreateReviewInputs, UpdateReviewInputs } from '@/utils/types/review'

import { FormButton } from '@/components/ui/form-button'
import { FormRatingInput } from '@/components/ui/form-rating-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ReviewPhotosList } from './components/review-photos-list'

const reviewTextMinLength = validationConfig.review.text.minLength
const reviewTextMaxLength = validationConfig.review.text.maxLength

type ReviewFormProps = {
    initialValues: CreateReviewInputs | UpdateReviewInputs
    isLoading: boolean
    onSubmit: (values: CreateReviewInputs | UpdateReviewInputs) => Promise<void>
}

export const ReviewForm = ({ initialValues, isLoading, onSubmit }: ReviewFormProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const validationSchema = Yup.object().shape({
        rating: Yup.number().min(1, t('validation.required')),
        text: Yup.string()
            .required(t('validation.required'))
            .min(reviewTextMinLength, t('validation.text.min_length', { min_length: reviewTextMinLength }))
            .max(reviewTextMaxLength, t('validation.text.max_length', { max_length: reviewTextMaxLength })),
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
                        {t('review.form.fields.rating.label')}
                    </label>
                    <FormRatingInput
                        value={formik.values.rating}
                        size={32}
                        error={formik.errors.rating}
                        onChange={value => formik.setFieldValue('rating', value)}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('review.form.fields.text.label')}
                    </label>
                    <FormTextarea
                        id="text"
                        name="text"
                        value={formik.values.text}
                        placeholder={t('placeholder.action.review')}
                        maxLength={reviewTextMaxLength}
                        error={formik.errors.text}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('review.form.fields.photos.label')}
                    </label>
                    <ReviewPhotosList
                        photos={formik.values.photos}
                        onChange={value => formik.setFieldValue('photos', value)}
                    />
                </div>
            </div>
            <div className="flex gap-x-2">
                <FormButton htmlType="submit" isLoading={isLoading}>
                    {t('common.action.send')}
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    {t('common.action.cancel')}
                </FormButton>
            </div>
        </form>
    )
}
