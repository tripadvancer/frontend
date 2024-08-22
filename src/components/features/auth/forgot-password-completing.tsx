'use client'

import { useTranslations } from 'next-intl'

import { AuthCompleting } from './auth-completing'

export const ForgotPasswordCompleting = () => {
    const t = useTranslations()

    return (
        <AuthCompleting
            title={t('auth.forgotPasswordCompleting.title')}
            text={t('auth.forgotPasswordCompleting.text')}
        />
    )
}
