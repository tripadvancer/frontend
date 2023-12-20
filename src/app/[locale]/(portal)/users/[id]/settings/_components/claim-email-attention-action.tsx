'use client'

import { useState } from 'react'

import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'

import { Button } from '@/components/forms/button/button'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ClaimEmailAttentionAction = () => {
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
        <Button variant="orange" isLoading={isLoading} onClick={handleResendVerificationEmail}>
            {t('claim.email.resend_verification_email')}
        </Button>
    )
}
