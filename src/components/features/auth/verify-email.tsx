'use client'

import { useState } from 'react'

import { verifyEmail } from 'supertokens-web-js/recipe/emailverification'

import { useToast } from '@/components/providers/toast-provider'
import { LinkButton } from '@/components/ui/link-button'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

type VerifyEmailStatus = Awaited<ReturnType<typeof verifyEmail>>['status']

// Also confirms a changed email: the backend applies the new address once it is verified
export const VerifyEmail = () => {
    const toast = useToast()

    const [status, setStatus] = useState<VerifyEmailStatus>()

    useOnMountUnsafe(() => {
        const handleVerifyEmail = async () => {
            try {
                await waitForSuperTokensInitialization()
                const response = await verifyEmail()
                setStatus(response.status)
            } catch {
                toast.error(UNEXPECTED_ERROR_MESSAGE)
            }
        }
        handleVerifyEmail()
    })

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
