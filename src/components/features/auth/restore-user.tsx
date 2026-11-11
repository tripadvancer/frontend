'use client'

import { useState } from 'react'

import { useToast } from '@/components/providers/toast-provider'
import { LinkButton } from '@/components/ui/link-button'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { userAPI } from '@/utils/redux/services/user/user.api'

type RestoreUserProps = {
    token: string
}

export const RestoreUser = ({ token }: RestoreUserProps) => {
    const toast = useToast()

    const [status, setStatus] = useState<string>()
    const [restoreUser] = userAPI.useRestoreUserMutation()

    useOnMountUnsafe(() => {
        const handleRestoreUser = async () => {
            try {
                const response = await restoreUser(token).unwrap()
                setStatus(response.status)
            } catch (err) {
                toast.error('An unexpected error has occurred. Please try again later.')
            }
        }
        handleRestoreUser()
    })

    if (!status) {
        return <p className="text-center">{'Restoring your account...'}</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'OK' && 'Your account has been restored.'}
                {status === 'INVALID_TOKEN_ERROR' && 'The restore link has expired. Please request a new restore link.'}
            </p>
            <LinkButton href="/" className="w-full">
                {'Go to Home'}
            </LinkButton>
        </>
    )
}
