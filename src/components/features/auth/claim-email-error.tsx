'use client'

import { useState } from 'react'

import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'

import { SignUpCompleting } from './sign-up-completing'

export const ClaimEmailError = () => {
    const toast = useToast()
    const dialog = useDialog()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleResendVerificationEmail = async () => {
        try {
            setIsLoading(true)
            await sendVerificationEmail()
            dialog.open(<SignUpCompleting />)
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="h7">Your email is not verified</h1>
            <p className="text-center">
                Verified accounts have more features. Please confirm your email by clicking the link in the email we
                sent you during registration.
            </p>
            <FormButton
                htmlType="button"
                className="w-full"
                isLoading={isLoading}
                onClick={handleResendVerificationEmail}
            >
                Resend verification email
            </FormButton>
        </div>
    )
}
