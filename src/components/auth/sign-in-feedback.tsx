'use client'

import { ButtonStroke } from '@/components/button-stroke'
import { useDialog } from '@/providers/dialog-provider'
import { UserStatus } from '@/utils/enums'
import { useScopedI18n } from '@/utils/i18n/i18n.client'

type SignInFeedbackProps = {
    reason: UserStatus
}

export const SignInFeedback = ({ reason }: SignInFeedbackProps) => {
    const t = useScopedI18n('auth.feedback.verify_email')
    const tCommon = useScopedI18n('common')
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col items-center gap-8 sm:w-104">
            <h1 className="text-h7-m sm:text-h7">{t('title')}</h1>
            <p className="text-center ">
                {reason === UserStatus.NOT_ACTIVATED && t('message.not_activated')}
                {reason === UserStatus.PENDING_DELETE && t('message.pending_delete')}
            </p>
            <ButtonStroke type="button" className="w-full" onClick={dialog.close}>
                {tCommon('action.close')}
            </ButtonStroke>
        </div>
    )
}
