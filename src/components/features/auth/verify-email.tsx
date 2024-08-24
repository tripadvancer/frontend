'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { verifyEmail } from 'supertokens-web-js/recipe/emailverification'

import { LinkButton } from '@/components/ui/link-button'
import { useToast } from '@/providers/toast-provider'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'

export const VerifyEmail = () => {
    const t = useTranslations()
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
        return <p className="text-center">{t('auth.verifyEmail.loading')}</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR' && t('auth.verifyEmail.status.expired')}
                {status === 'OK' && t('auth.verifyEmail.status.ok')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.goHome')}
            </LinkButton>
        </>
    )
}
