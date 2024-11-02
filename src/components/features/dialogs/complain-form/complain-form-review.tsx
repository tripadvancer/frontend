'use client'

import { useTranslations } from 'next-intl'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { complainAPI } from '@/redux/services/complain.api'
import { ReviewComplaintInputs } from '@/redux/services/complain.types'
import { ComplaintReasonsEnum } from '@/utils/enums'

import { ComplainForm } from './complain-form'

export const ComplainFormReview = ({ reviewId }: { reviewId: number }) => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const [complain, { isLoading }] = complainAPI.useComplainAboutReviewMutation()

    const handleSubmit = async (inputs: ReviewComplaintInputs) => {
        try {
            await complain(inputs)
            toast.success(t('success.sendComplaint'))
            dialog.close()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('dialog.complaintForm.title.review')}</h1>
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
