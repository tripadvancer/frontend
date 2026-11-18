'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { FormButton } from '@/components/ui/form-button'
import { FormSelect } from '@/components/ui/form-select'
import { FormTextarea } from '@/components/ui/form-textarea'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { PlaceReviewStatus } from '@/utils/enums'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { UpdateReviewStatusResponse } from '@/utils/redux/services/places/places.types'

const placeReviewStatusLabels: Record<PlaceReviewStatus, string> = {
    [PlaceReviewStatus.NEEDS_REVIEW]: 'Needs review',
    [PlaceReviewStatus.NEEDS_IMPROVEMENT]: 'Needs improvement',
    [PlaceReviewStatus.APPROVED]: 'Approved',
    [PlaceReviewStatus.REJECTED]: 'Rejected',
}

type ReviewStatusFormProps = {
    placeId: number
    reviewStatus: PlaceReviewStatus
    reviewMessage: string | null
    onSuccess: (result: UpdateReviewStatusResponse) => void
}

type ReviewStatusFormValues = {
    reviewStatus: PlaceReviewStatus
    reviewMessage: string
}

// An empty comment keeps the current one, approving a place deletes its comment
export const ReviewStatusForm = ({ placeId, reviewStatus, reviewMessage, onSuccess }: ReviewStatusFormProps) => {
    const dialog = useDialog()
    const settings = useAppSettings()
    const toast = useToast()

    const messageMaxLength = settings?.validation.reviewMessage.maxLength ?? 0

    const [updateReviewStatus, { isLoading }] = placesAPI.useUpdateReviewStatusMutation()

    const validationSchema = Yup.object().shape({
        reviewMessage: Yup.string()
            .trim()
            .max(messageMaxLength, `This field must be at most ${messageMaxLength} characters long`),
    })

    const saveReviewStatus = async (values: ReviewStatusFormValues) => {
        try {
            const result = await updateReviewStatus({
                placeId,
                reviewStatus: values.reviewStatus,
                reviewMessage: values.reviewMessage.trim(),
            }).unwrap()
            onSuccess(result)
            toast.success('The review status has been saved.')
            dialog.close()
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
        }
    }

    const formik = useFormik({
        initialValues: {
            reviewStatus,
            reviewMessage: reviewMessage ?? '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: settings ? validationSchema : Yup.object(),
        onSubmit: async values => {
            if (
                values.reviewStatus === PlaceReviewStatus.APPROVED &&
                Boolean(reviewMessage || values.reviewMessage.trim())
            ) {
                dialog.open(
                    <Confirmation
                        title="Approve place"
                        message="Saving the Approved status will delete the review comment."
                        variant="red"
                        onConfirm={() => {
                            void saveReviewStatus(values)
                        }}
                        onCancel={() =>
                            dialog.open(
                                <ReviewStatusForm
                                    placeId={placeId}
                                    reviewStatus={values.reviewStatus}
                                    reviewMessage={values.reviewMessage}
                                    onSuccess={onSuccess}
                                />,
                            )
                        }
                    />,
                )
                return
            }

            await saveReviewStatus(values)
        },
    })

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">Review status</h1>
            <hr className="border-black-70" />
            <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <label className="font-medium">Status</label>
                        <FormSelect
                            name="reviewStatus"
                            placeholder={placeReviewStatusLabels[formik.values.reviewStatus]}
                            options={Object.values(PlaceReviewStatus).map(status => ({
                                value: status,
                                label: placeReviewStatusLabels[status],
                            }))}
                            disabled={isLoading}
                            onChange={value => formik.setFieldValue('reviewStatus', value)}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="reviewMessage" className="font-medium">
                            Comment
                        </label>
                        <FormTextarea
                            id="reviewMessage"
                            name="reviewMessage"
                            value={formik.values.reviewMessage}
                            placeholder="Describe the changes the place needs"
                            maxLength={messageMaxLength}
                            style={{ height: '120px' }}
                            error={formik.errors.reviewMessage}
                            disabled={isLoading}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className="flex gap-x-2">
                    <FormButton htmlType="submit" isLoading={isLoading} isDisabled={!settings}>
                        Save
                    </FormButton>
                    <FormButton type="stroke" onClick={() => dialog.close()}>
                        Cancel
                    </FormButton>
                </div>
            </form>
        </div>
    )
}
