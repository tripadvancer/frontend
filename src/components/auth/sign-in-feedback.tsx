'use client'

import { ButtonStroke } from '@/components/button-stroke'
import { useDialog } from '@/providers/dialog-provider'
import { UserStatus } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

type SignInFeedbackProps = {
    reason: UserStatus
}

export const SignInFeedback = ({ reason }: SignInFeedbackProps) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="text-h7-m sm:text-h7">{t('auth.feedback.verify_email.title')}</h1>
            <p className="text-center ">
                {reason === UserStatus.NOT_ACTIVATED && t('auth.feedback.verify_email.message.not_activated')}
                {reason === UserStatus.PENDING_DELETE && t('auth.feedback.verify_email.message.pending_delete')}
            </p>
            <ButtonStroke type="button" className="w-full" onClick={dialog.close}>
                {t('common.action.close')}
            </ButtonStroke>
        </div>
    )
}
