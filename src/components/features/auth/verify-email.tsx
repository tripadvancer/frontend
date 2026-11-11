'use client'

import { useState } from 'react'

import { verifyEmail } from 'supertokens-web-js/recipe/emailverification'

import { useToast } from '@/components/providers/toast-provider'
import { LinkButton } from '@/components/ui/link-button'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'

export const VerifyEmail = () => {
    const toast = useToast()

    const [status, setStatus] = useState<string>()

    useOnMountUnsafe(() => {
        const handleVerifyEmail = async () => {
            try {
                const response = await verifyEmail()
                setStatus(response.status)
            } catch (err) {
                toast.error('An unexpected error has occurred. Please try again later.')
            }
        }
        handleVerifyEmail()
    })

    if (!status) {
        return <p className="text-center">{'Verifying your email...'}</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR' &&
                    'The email verification link has expired. Please sign in again so we can send you a new verification link.'}
                {status === 'OK' && 'Your email has been verified.'}
            </p>
            <LinkButton href="/" className="w-full">
                {'Go to Home'}
            </LinkButton>
        </>
    )
}
