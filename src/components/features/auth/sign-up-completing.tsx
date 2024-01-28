'use client'

import { FormButtonStroke } from '@/components/ui/form-button-stroke'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const SignUpCompleting = () => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="text-h7-m sm:text-h7">{t('auth.signup_completing.title')}</h1>
            <p className="text-center">{t('auth.signup_completing.message')}</p>
            <FormButtonStroke type="button" className="w-full" onClick={dialog.close}>
                {t('common.action.ok')}
            </FormButtonStroke>
        </div>
    )
}
