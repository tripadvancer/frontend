'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormRatingInput } from '@/components/ui/form-rating-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { CreateReviewInputs, UpdateReviewInputs } from '@/utils/redux/services/reviews/reviews.types'

import { ReviewFormIsVisited } from './components/review-form-is-visited'
import { ReviewFormPhotosList } from './components/review-form-photos-list'

type ReviewFormProps = {
    initialValues: CreateReviewInputs | UpdateReviewInputs
    isLoading?: boolean
    onSubmit: (values: CreateReviewInputs | UpdateReviewInputs) => void
}

export const ReviewForm = ({ initialValues, isLoading, onSubmit }: ReviewFormProps) => {
    const settings = useAppSettings()
    const dialog = useDialog()
    const [isFormDisabled, setIsFormDisabled] = useState(false)
    const reviewValidation = settings?.validation.review
    const reviewTextMinLength = reviewValidation?.text.minLength ?? 0
    const reviewTextMaxLength = reviewValidation?.text.maxLength ?? 0
    const ratingMin = reviewValidation?.rate.min ?? 0
    const ratingMax = reviewValidation?.rate.max ?? 0

    const validationSchema = Yup.object().shape({
        rating: Yup.number().min(ratingMin, 'This field is required').max(ratingMax),
        text: Yup.string()
            .trim()
            .required('This field is required')
            .min(reviewTextMinLength, `This field must be at least ${reviewTextMinLength} characters long`)
            .max(reviewTextMaxLength, `This field must be at most ${reviewTextMaxLength} characters long`),
    })

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: reviewValidation ? validationSchema : Yup.object(),
        onSubmit,
    })

    return (
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        Your rating
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
                        Review
                    </label>
                    <FormTextarea
                        id="text"
                        name="text"
                        value={formik.values.text}
                        placeholder="Share your impressions in detail — this way you will help others learn more about this place"
                        maxLength={reviewTextMaxLength}
                        style={{ height: '120px' }}
                        error={formik.errors.text}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        Photos
                    </label>
                    <ReviewFormPhotosList
                        photos={formik.values.photos}
                        isDisabled={isLoading}
                        setIsFormDisabled={setIsFormDisabled}
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
                <FormButton
                    htmlType="submit"
                    isLoading={isLoading}
                    isDisabled={!settings || !formik.dirty || isFormDisabled}
                >
                    Save
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    Close
                </FormButton>
            </div>
        </form>
    )
}
