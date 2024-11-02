'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'

import { SignUpCompleting } from './sign-up-completing'

export const ClaimEmailError = () => {
    const t = useTranslations()
    const toast = useToast()
    const dialog = useDialog()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleResendVerificationEmail = async () => {
        try {
            setIsLoading(true)
            await sendVerificationEmail()
            dialog.open(<SignUpCompleting />)
        } catch {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="h7">{t('auth.claimEmailError.title')}</h1>
            <p className="text-center">{t('auth.claimEmailError.text')}</p>
            <FormButton
                htmlType="button"
                className="w-full"
                isLoading={isLoading}
                onClick={handleResendVerificationEmail}
            >
                {t('auth.claimEmailError.resendVerificationEmail')}
            </FormButton>
        </div>
    )
}
