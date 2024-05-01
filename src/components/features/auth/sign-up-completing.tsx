'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

import { AuthCompleting } from './auth-completing'

export const SignUpCompleting = () => {
    const t = useI18n()

    return <AuthCompleting title={t('auth.signup_completing.title')} message={t('auth.signup_completing.message')} />
}
