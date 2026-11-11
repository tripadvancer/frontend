'use client'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { ComplaintReasonsEnum } from '@/utils/enums'
import { complainAPI } from '@/utils/redux/services/complain/complain.api'
import { PlaceComplaintInputs } from '@/utils/redux/services/complain/complain.types'

import { ComplainForm } from './complain-form'

export const ComplainFormPlace = ({ placeId }: { placeId: number }) => {
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
            toast.success('Your complaint has been sent.')
            dialog.close()
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{'Complain about a place'}</h1>
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
