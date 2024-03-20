'use client'

import { useState } from 'react'

import { verifyEmail } from 'supertokens-web-js/recipe/emailverification'

import { LinkButton } from '@/components/ui/link-button'
import { useToast } from '@/providers/toast-provider'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { useI18n } from '@/utils/i18n/i18n.client'

export const VerifyEmail = () => {
    const t = useI18n()
    const toast = useToast()

    const [status, setStatus] = useState<string>()

    useOnMountUnsafe(() => {
        const handleVerifyEmail = async () => {
            try {
                const response = await verifyEmail()
                setStatus(response.status)
            } catch (err) {
                toast.error(t('common.error'))
            }
        }
        handleVerifyEmail()
    })

    if (!status) {
        return <p className="text-center">{t('auth.verify_email.loading')}</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR' && t('auth.verify_email.token_expired')}
                {status === 'OK' && t('auth.verify_email.ok')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.go_home')}
            </LinkButton>
        </>
    )
}
