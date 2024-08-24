'use client'

import { useTranslations } from 'next-intl'

import { AuthCompleting } from './auth-completing'

export const RequestUserDeletionCompleting = () => {
    const t = useTranslations()

    return (
        <AuthCompleting
            title={t('auth.requestUserDeletionCompleting.title')}
            text={t('auth.requestUserDeletionCompleting.text')}
        />
    )
}
