'use client'

import { useState } from 'react'

import { PlaceComplaintInputs } from '@/utils/types/complaint'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placeComplaint } from '@/services/complain'
import { ComplaintReasonsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ComplainForm } from './complain-form'

type PlaceComplainProps = {
    placeId: number
}

export const PlaceComplain = ({ placeId }: PlaceComplainProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (values: PlaceComplaintInputs) => {
        try {
            setIsLoading(true)
            await placeComplaint(values)
            toast.success(t('success.send_complaint'))
            dialog.close()
        } catch (err) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="text-h7">{t('complaint.form.place.title')}</h1>
            <hr className="border-black-70" />
            <ComplainForm
                initialValues={{
                    placeId,
                    reason: ComplaintReasonsEnum.ABUSE,
                    text: '',
                }}
                isLoading={isLoading}
                onSubmit={values => handleSubmit(values as PlaceComplaintInputs)}
            />
        </div>
    )
}
