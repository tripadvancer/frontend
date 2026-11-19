'use client'

import { useState } from 'react'

import { thirdPartySignInAndUp } from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { useRouter } from 'next/navigation'

import { LinkButton } from '@/components/ui/link-button'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

// SIGN_IN_UP_NOT_ALLOWED comes with the backend reason, e.g. EMAIL_ALREADY_EXISTS_ERROR for an email used by another login method
export const ThirdPartyCallback = () => {
    const router = useRouter()

    const [status, setStatus] = useState<string>()

    useOnMountUnsafe(() => {
        async function handleGoogleCallback() {
            try {
                await waitForSuperTokensInitialization()
                const response = await thirdPartySignInAndUp()

                setStatus(response.status === 'SIGN_IN_UP_NOT_ALLOWED' ? response.reason : response.status)

                if (response.status === 'OK') {
                    router.replace('/')
                    router.refresh()
                }
            } catch {
                setStatus('GENERAL_ERROR')
            }
        }

        handleGoogleCallback()
    })

    return (
        <>
            <p className="text-center">
                {status === 'NO_EMAIL_GIVEN_BY_PROVIDER' &&
                    'No email provided by social login. Please use another form of login.'}

                {status === 'EMAIL_ALREADY_EXISTS_ERROR' &&
                    'Seems like you already have an account with another method. Please use that instead.'}

                {status === 'GENERAL_ERROR' && UNEXPECTED_ERROR_MESSAGE}

                {status === 'OK' && 'You are being redirected...'}

                {!status && 'We are checking your status...'}
            </p>

            {status && status !== 'OK' && (
                <LinkButton href="/" className="w-full">
                    Go to Home
                </LinkButton>
            )}
        </>
    )
}
