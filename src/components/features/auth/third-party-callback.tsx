'use client'

import { useState } from 'react'

import { thirdPartySignInAndUp } from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { useRouter } from 'next/navigation'

import { LinkButton } from '@/components/ui/link-button'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ThirdPartyCallback = () => {
    const t = useI18n()
    const router = useRouter()

    const [status, setStatus] = useState<string>()

    useOnMountUnsafe(() => {
        async function handleGoogleCallback() {
            try {
                const response = await thirdPartySignInAndUp()
                setStatus(response.status)

                if (response.status === 'OK') {
                    router.replace('/')
                }
            } catch (err: any) {
                if (err.message === 'EMAIL_ALREADY_EXISTS_ERROR') {
                    setStatus('EMAIL_ALREADY_EXISTS_ERROR')
                } else {
                    setStatus('GENERAL_ERROR')
                }
            }
        }

        handleGoogleCallback()
    })

    return (
        <>
            <p className="text-center">
                {status === 'NO_EMAIL_GIVEN_BY_PROVIDER' && t('auth.third_party_callback.error.email_not_provided')}
                {status === 'EMAIL_ALREADY_EXISTS_ERROR' && t('auth.third_party_callback.error.email_already_exists')}
                {status === 'SIGN_IN_UP_NOT_ALLOWED' && t('common.error')}
                {status === 'GENERAL_ERROR' && t('common.error')}
                {status === 'OK' && t('auth.third_party_callback.redirecting')}

                {!status && t('auth.third_party_callback.checking_status')}
            </p>

            {status && status !== 'OK' && (
                <LinkButton href="/" className="w-full">
                    {t('common.action.go_home')}
                </LinkButton>
            )}
        </>
    )
}
