'use client'

import { useTranslations } from 'next-intl'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { complainAPI } from '@/redux/services/complain.api'
import { PlaceComplaintInputs } from '@/redux/services/complain.types'
import { ComplaintReasonsEnum } from '@/utils/enums'

import { ComplainForm } from './complain-form'

export const ComplainFormPlace = ({ placeId }: { placeId: number }) => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const [complain, { isLoading }] = complainAPI.useComplainAboutPlaceMutation()

    const handleSubmit = async (inputs: PlaceComplaintInputs) => {
        try {
            const trimmedInputs = {
                ...inputs,
                text: inputs.text.trim(),
            }
            await complain(trimmedInputs)
            toast.success(t('success.sendComplaint'))
            dialog.close()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('dialog.complaintForm.title.place')}</h1>
            <hr className="border-black-70" />
            <ComplainForm
                initialValues={{
                    placeId,
                    reason: ComplaintReasonsEnum.ABUSE,
                    text: '',
                }}
                isLoading={isLoading}
                onSubmit={inputs => handleSubmit(inputs as PlaceComplaintInputs)}
            />
        </div>
    )
}
