'use client'

import { useEffect, useRef, useState } from 'react'

import { verifyEmail } from 'supertokens-web-js/recipe/emailverification'

import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { LinkButton } from '@/components/ui/link-button'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

export const VerifyEmail = () => {
    const toast = useToast()
    const settings = useAppSettings()

    const [status, setStatus] = useState<string>()
    const verification = useRef<Promise<string> | null>(null)

    useEffect(() => {
        if (!settings) {
            return
        }

        let isActive = true

        verification.current ??= waitForSuperTokensInitialization()
            .then(() => verifyEmail())
            .then(response => response.status)

        void verification.current
            .then(verificationStatus => {
                if (isActive) {
                    setStatus(verificationStatus)
                }
            })
            .catch(() => {
                if (isActive) {
                    toast.error('An unexpected error has occurred. Please try again later.')
                }
            })

        return () => {
            isActive = false
        }
    }, [settings, toast])

    if (!status) {
        return <p className="text-center">Verifying your email...</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR' &&
                    'The email verification link has expired. Please sign in again so we can send you a new verification link.'}

                {status === 'OK' && 'Your email has been verified.'}
            </p>
            <LinkButton href="/" className="w-full">
                Go to Home
            </LinkButton>
        </>
    )
}
