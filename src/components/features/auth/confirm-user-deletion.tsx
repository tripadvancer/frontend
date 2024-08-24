'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import Session from 'supertokens-web-js/recipe/session'

import { LinkButton } from '@/components/ui/link-button'
import { useToast } from '@/providers/toast-provider'
import { userAPI } from '@/redux/services/user-api'
import { useOnMountUnsafe } from '@/utils/hooks/use-on-mount-unsafe'

type ConfirmUserRemovalProps = {
    token: string
}

export const ConfirmUserDeletion = ({ token }: ConfirmUserRemovalProps) => {
    const t = useTranslations()
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
                toast.error(t('common.error'))
            }
        }
        handleConfirmUserRemoval()
    })

    if (!status) {
        return <p className="text-center">{t('auth.confirmUserDeletion.loading')}</p>
    }

    return (
        <>
            <p className="text-center">
                {status === 'OK' && t('auth.confirmUserDeletion.status.ok')}
                {status === 'INVALID_TOKEN_ERROR' && t('auth.confirmUserDeletion.status.expired')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.goHome')}
            </LinkButton>
        </>
    )
}
