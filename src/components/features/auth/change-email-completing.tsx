'use client'

import { useTranslations } from 'next-intl'

import { AuthCompleting } from './auth-completing'

export const ChangeEmailCompleting = () => {
    const t = useTranslations()

    return <AuthCompleting title={t('auth.changeEmailCompleting.title')} text={t('auth.changeEmailCompleting.text')} />
}
