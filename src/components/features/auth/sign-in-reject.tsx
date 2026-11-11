'use client'

import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'

export const SignInReject = () => {
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="h7">Your account is pending deletion</h1>
            <p className="text-center">
                We have sent you the instructions to restore your account. Please note that there is a limited time
                window available for account restoration.
            </p>
            <FormButton type="stroke" htmlType="button" className="w-full" onClick={dialog.close}>
                Ok
            </FormButton>
        </div>
    )
}
