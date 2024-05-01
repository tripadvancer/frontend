'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

import { AuthCompleting } from './auth-completing'

export const RequestUserDeletionCompleting = () => {
    const t = useI18n()

    return (
        <AuthCompleting
            title={t('auth.request_user_deletion_completing.title')}
            message={t('auth.request_user_deletion_completing.message')}
        />
    )
}
