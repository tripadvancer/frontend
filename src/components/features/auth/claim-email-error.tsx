'use client'

import { useState } from 'react'

import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type ClaimEmailErrorProps = {
    userId: number
}

export const ClaimEmailError = ({ userId }: ClaimEmailErrorProps) => {
    const t = useI18n()
    const toast = useToast()
    const dialog = useDialog()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleResendVerificationEmail = async () => {
        try {
            setIsLoading(true)
            await sendVerificationEmail()
            toast.success(t('success.send_verification_email'))
            dialog.close()
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
            <h1 className="text-h7-m sm:text-h7">{t('auth.claim_email_error.title')}</h1>
            <p className="text-center">{t('auth.claim_email_error.message')}</p>
            <FormButton type="button" className="w-full" isLoading={isLoading} onClick={handleResendVerificationEmail}>
                {t('auth.claim_email_error.resend_verification_email')}
            </FormButton>
            <div className="text-center">
                {t('auth.claim_email_error.go_to_settings', {
                    settings_link: (
                        <span className="link" onClick={handleGoToSettings}>
                            {t('auth.claim_email_error.settings_link')}
                        </span>
                    ),
                })}
            </div>
        </div>
    )
}
