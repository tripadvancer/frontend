'use client'

import { useState } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { LinkButton } from '@/components/ui/link-button'
import { useToast } from '@/providers/toast-provider'
import { confirmUserDeletion } from '@/services/user'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'
import { useI18n } from '@/utils/i18n/i18n.client'

type ConfirmUserRemovalProps = {
    token: string
}

export const ConfirmUserDeletion = ({ token }: ConfirmUserRemovalProps) => {
    const t = useI18n()
    const toast = useToast()

    const [status, setStatus] = useState<string>()

    useOnMountUnsafe(() => {
        const handleConfirmUserRemoval = async () => {
            try {
                const response = await confirmUserDeletion(token)
                await Session.signOut()
                setStatus(response.status)
            } catch (err) {
                toast.error(t('common.error'))
            }
        }
        handleConfirmUserRemoval()
    })

    if (!status) {
        return <p className="text-center">{t('auth.confirm_user_deletion.loading')}</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'OK' && t('auth.confirm_user_deletion.ok')}
                {status === 'INVALID_TOKEN_ERROR' && t('auth.confirm_user_deletion.token_expired')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.go_home')}
            </LinkButton>
        </>
    )
}
