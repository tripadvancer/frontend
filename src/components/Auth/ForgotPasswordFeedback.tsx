'use client'

import { ButtonStroke } from '@/components/ButtonStroke'
import { useDialog } from '@/providers/DialogProvider'
import { useScopedI18n } from '@/utils/i18n.client'

export const ForgotPasswordFeedback = () => {
    const t = useScopedI18n('dialog.feedback.forgot_password')
    const tCommon = useScopedI18n('common')
    const dialog = useDialog()

    return (
        <div className="sm:w-104 flex w-full flex-col items-center gap-8">
            <h1 className="text-h7 sm:text-h7-m">{t('title')}</h1>
            <p className="text-center">{t('message')}</p>
            <ButtonStroke type="button" className="w-full" onClick={dialog.close}>
                {tCommon('cta.close')}
            </ButtonStroke>
        </div>
    )
}
