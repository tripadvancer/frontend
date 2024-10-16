'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { thirdPartySignInAndUp } from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { useRouter } from 'next/navigation'

import { LinkButton } from '@/components/ui/link-button'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'

export const ThirdPartyCallback = () => {
    const t = useTranslations()
    const router = useRouter()

    const [status, setStatus] = useState<string>()

    useOnMountUnsafe(() => {
        async function handleGoogleCallback() {
            try {
                const response = await thirdPartySignInAndUp()
                setStatus(response.status)

                if (response.status === 'OK') {
                    router.replace('/')
                    router.refresh()
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
                {status === 'NO_EMAIL_GIVEN_BY_PROVIDER' && t('auth.thirdPartyCallback.error.emailNotProvided')}
                {status === 'EMAIL_ALREADY_EXISTS_ERROR' && t('auth.thirdPartyCallback.error.emailAlreadyExists')}
                {status === 'SIGN_IN_UP_NOT_ALLOWED' && t('common.error')}
                {status === 'GENERAL_ERROR' && t('common.error')}
                {status === 'OK' && t('auth.thirdPartyCallback.redirecting')}

                {!status && t('auth.thirdPartyCallback.checking')}
            </p>

            {status && status !== 'OK' && (
                <LinkButton href="/" className="w-full">
                    {t('common.action.goHome')}
                </LinkButton>
            )}
        </>
    )
}
