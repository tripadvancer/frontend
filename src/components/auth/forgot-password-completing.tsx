'use client'

import { ButtonStroke } from '@/components/forms/button-stroke/button-stroke'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ForgotPasswordCompleting = () => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="text-h7 sm:text-h7-m">{t('auth.completing_forgot_password.title')}</h1>
            <p className="text-center">{t('auth.completing_forgot_password.message')}</p>
            <ButtonStroke type="button" className="w-full" onClick={dialog.close}>
                {t('common.action.ok')}
            </ButtonStroke>
        </div>
    )
}
