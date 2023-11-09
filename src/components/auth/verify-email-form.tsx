'use client'

import { useEffect, useState } from 'react'

import { verifyEmail } from 'supertokens-web-js/recipe/emailverification'

import { LinkButton } from '@/components/link-button'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const VerifyEmailForm = () => {
    const t = useI18n()
    const toast = useToast()
    const [status, setStatus] = useState<string>()

    useEffect(() => {
        const handleVerifyEmail = async () => {
            try {
                const response = await verifyEmail()
                setStatus(response.status)
            } catch (err) {
                toast.error(t('common.error'))
            }
        }
        handleVerifyEmail()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!status) {
        return (
            <>
                <p className="text-center">{t('pages.auth.verify.loading')}</p>
                <LinkButton href="/" className="w-full">
                    {t('common.cta.home')}
                </LinkButton>
            </>
        )
    }

    return (
        <>
            <p className="text-center">
                {status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR' && t('pages.auth.verify.token_expired')}
                {status === 'OK' && t('pages.auth.verify.success')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.cta.home')}
            </LinkButton>
        </>
    )
}
