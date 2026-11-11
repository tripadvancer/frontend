'use client'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { ComplaintReasonsEnum } from '@/utils/enums'
import { complainAPI } from '@/utils/redux/services/complain/complain.api'
import { ReviewComplaintInputs } from '@/utils/redux/services/complain/complain.types'

import { ComplainForm } from './complain-form'

export const ComplainFormReview = ({ reviewId }: { reviewId: number }) => {
    const dialog = useDialog()
    const toast = useToast()

    const [complain, { isLoading }] = complainAPI.useComplainAboutReviewMutation()

    const handleSubmit = async (inputs: ReviewComplaintInputs) => {
        try {
            const trimmedInputs = {
                ...inputs,
                text: inputs.text.trim(),
            }
            await complain(trimmedInputs)
            toast.success('Your complaint has been sent.')
            dialog.close()
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">Complain about a review</h1>
            <hr className="border-black-70" />
            <ComplainForm
                initialValues={{
                    reviewId,
                    reason: ComplaintReasonsEnum.ABUSE,
                    text: '',
                }}
                isLoading={isLoading}
                onSubmit={inputs => handleSubmit(inputs as ReviewComplaintInputs)}
            />
        </div>
    )
}
