'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

import { AuthCompleting } from './auth-completing'

export const ForgotPasswordCompleting = () => {
    const t = useI18n()

    return (
        <AuthCompleting
            title={t('auth.forgot_password_completing.title')}
            message={t('auth.forgot_password_completing.message')}
        />
    )
}
