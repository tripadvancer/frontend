'use client'

import type { ReviewComplaintInputs } from '@/utils/types/complaint'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { complainAPI } from '@/redux/services/complain-api'
import { ComplaintReasonsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ComplainForm } from './complain-form'

export const ComplainAboutReview = ({ reviewId }: { reviewId: number }) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const [complain, { isLoading }] = complainAPI.useComplainAboutReviewMutation()

    const handleSubmit = async (inputs: ReviewComplaintInputs) => {
        try {
            await complain(inputs)
            toast.success(t('success.send_complaint'))
            dialog.close()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('complaint.form.review.title')}</h1>
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
