'use client'

import { ButtonStroke } from '@/components/ButtonStroke'
import { useDialog } from '@/providers/DialogProvider'
import { ApiErrorReason } from '@/utils/enums'
import { useScopedI18n } from '@/utils/i18n.client'

type SignInFeedbackProps = {
    reason: ApiErrorReason
}

export const SignInFeedback = ({ reason }: SignInFeedbackProps) => {
    const t = useScopedI18n('dialog.feedback.verify_email')
    const tCommon = useScopedI18n('common')
    const dialog = useDialog()

    return (
        <div className="sm:w-104 flex w-full flex-col items-center gap-8">
            <h1 className="text-h7-m sm:text-h7">{t('title')}</h1>
            <p className="text-center ">
                {reason === ApiErrorReason.ACCOUNT_NOT_ACTIVATED && t('message.not_activated')}
                {reason === ApiErrorReason.ACCOUNT_PENDING_DELETE && t('message.pending_delete')}
            </p>
            <ButtonStroke type="button" className="w-full" onClick={dialog.close}>
                {tCommon('cta.close')}
            </ButtonStroke>
        </div>
    )
}
