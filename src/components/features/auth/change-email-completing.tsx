'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

import { AuthCompleting } from './auth-completing'

export const ChangeEmailCompleting = () => {
    const t = useI18n()

    return (
        <AuthCompleting
            title={t('auth.change_email_completing.title')}
            message={t('auth.change_email_completing.message')}
        />
    )
}
