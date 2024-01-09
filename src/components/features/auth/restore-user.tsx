'use client'

import { useState } from 'react'

import { LinkButton } from '@/components/ui/link-button'
import { useToast } from '@/providers/toast-provider'
import { restoreUser } from '@/services/user'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { useI18n } from '@/utils/i18n/i18n.client'

type RestoreUserProps = {
    token: string
}

export const RestoreUser = ({ token }: RestoreUserProps) => {
    const t = useI18n()
    const toast = useToast()

    const [status, setStatus] = useState<string>()

    useOnMountUnsafe(() => {
        const handleRestoreUser = async () => {
            try {
                const response = await restoreUser(token)
                setStatus(response.status)
            } catch (err) {
                toast.error(t('common.error'))
            }
        }
        handleRestoreUser()
    })

    if (!status) {
        return <p className="text-center">{t('pages.auth.restore_user.loading')}</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'OK' && t('pages.auth.restore_user.ok')}
                {status === 'INVALID_TOKEN_ERROR' && t('pages.auth.restore_user.token_expired')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.go_home')}
            </LinkButton>
        </>
    )
}
