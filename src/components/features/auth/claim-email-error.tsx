'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'

import { SignUpCompleting } from './sign-up-completing'

type ClaimEmailErrorProps = {
    userId: number
}

export const ClaimEmailError = ({ userId }: ClaimEmailErrorProps) => {
    const t = useTranslations()
    const toast = useToast()
    const dialog = useDialog()
    const router = useRouter()

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

    const handleGoToSettings = () => {
        dialog.close()
        router.push(`/users/${userId}/settings`)
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
            <div className="text-center">
                {t.rich('auth.claimEmailError.goToSettings', {
                    settingsLink: settingsLink => (
                        <span className="link" onClick={handleGoToSettings}>
                            {settingsLink}
                        </span>
                    ),
                })}
            </div>
        </div>
    )
}
