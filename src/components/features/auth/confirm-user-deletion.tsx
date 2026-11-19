'use client'

import { useState } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { useToast } from '@/components/providers/toast-provider'
import { LinkButton } from '@/components/ui/link-button'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { userAPI } from '@/utils/redux/services/user/user.api'
import { ConfirmUserDeletionResponse } from '@/utils/redux/services/user/user.types'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

type ConfirmUserDeletionProps = {
    token: string
}

export const ConfirmUserDeletion = ({ token }: ConfirmUserDeletionProps) => {
    const toast = useToast()

    const [status, setStatus] = useState<ConfirmUserDeletionResponse['status']>()
    const [confirmUserDeletion] = userAPI.useConfirmUserDeletionMutation()

    useOnMountUnsafe(() => {
        const handleConfirmUserDeletion = async () => {
            try {
                await waitForSuperTokensInitialization()
                const response = await confirmUserDeletion(token).unwrap()
                setStatus(response.status)

                // The backend revokes the sessions of the deleted account, sign out this device as well
                if (response.status === 'OK') {
                    await Session.signOut()
                }
            } catch {
                toast.error(UNEXPECTED_ERROR_MESSAGE)
            }
        }
        handleConfirmUserDeletion()
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
