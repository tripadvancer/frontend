'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { useToast } from '@/components/providers/toast-provider'
import { LinkButton } from '@/components/ui/link-button'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { userAPI } from '@/utils/redux/services/user/user.api'

type RestoreUserProps = {
    token: string
}

export const RestoreUser = ({ token }: RestoreUserProps) => {
    const t = useTranslations()
    const toast = useToast()

    const [status, setStatus] = useState<string>()
    const [restoreUser] = userAPI.useRestoreUserMutation()

    useOnMountUnsafe(() => {
        const handleRestoreUser = async () => {
            try {
                const response = await restoreUser(token).unwrap()
                setStatus(response.status)
            } catch (err) {
                toast.error(t('common.error'))
            }
        }
        handleRestoreUser()
    })

    if (!status) {
        return <p className="text-center">{t('auth.restoreUser.loading')}</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'OK' && t('auth.restoreUser.status.ok')}
                {status === 'INVALID_TOKEN_ERROR' && t('auth.restoreUser.status.expired')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.goHome')}
            </LinkButton>
        </>
    )
}
