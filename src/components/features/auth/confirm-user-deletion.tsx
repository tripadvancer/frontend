'use client'

import { useState } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { useToast } from '@/components/providers/toast-provider'
import { LinkButton } from '@/components/ui/link-button'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { userAPI } from '@/utils/redux/services/user/user.api'

type ConfirmUserRemovalProps = {
    token: string
}

export const ConfirmUserDeletion = ({ token }: ConfirmUserRemovalProps) => {
    const toast = useToast()

    const [status, setStatus] = useState<string>()
    const [confirmUserDeletion] = userAPI.useConfirmUserDeletionMutation()

    useOnMountUnsafe(() => {
        const handleConfirmUserRemoval = async () => {
            try {
                const response = await confirmUserDeletion(token).unwrap()
                setStatus(response.status)
                await Session.signOut()
            } catch (err) {
                toast.error('An unexpected error has occurred. Please try again later.')
            }
        }
        handleConfirmUserRemoval()
    })

    if (!status) {
        return <p className="text-center">Starting the deletion process...</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'OK' &&
                    'The deletion process has been started. This process may take up to several days. You can restore your account using the link sent to your email until the deletion process is finished.'}
                {status === 'INVALID_TOKEN_ERROR' &&
                    'The confirmation link has expired. Please request a new confirmation link.'}
            </p>
            <LinkButton href="/" className="w-full">
                Go to Home
            </LinkButton>
        </>
    )
}
