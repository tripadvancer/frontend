'use client'

import { useState } from 'react'

import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'

import { ButtonMinor } from '@/components/forms/button-minor/button-minor'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const BlockVerificationEmailResendButton = () => {
    const t = useI18n()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleResendVerificationEmail = async () => {
        try {
            setIsLoading(true)
            await sendVerificationEmail()
            toast.success(t('success.send_verification_email'))
        } catch {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ButtonMinor variant="blue" isLoading={isLoading} onClick={handleResendVerificationEmail}>
            {t('pages.user.account.verify_email.action')}
        </ButtonMinor>
    )
}
