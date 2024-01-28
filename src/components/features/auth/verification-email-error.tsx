'use client'

import { useState } from 'react'

import Link from 'next/link'

import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const VerificationEmailError = () => {
    const t = useI18n()
    const toast = useToast()
    const dialog = useDialog()

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

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="text-h7-m sm:text-h7">{t('claim.email.title')}</h1>
            <p className="text-center">{t('claim.email.message')}</p>
            <FormButton type="button" className="w-full" isLoading={isLoading} onClick={handleResendVerificationEmail}>
                {t('claim.email.resend_verification_email')}
            </FormButton>
            <div className="text-center">
                {t('claim.email.change_email', {
                    settings_link: <Link href="#">{t('claim.email.settings_link')}</Link>,
                })}
            </div>
        </div>
    )
}
