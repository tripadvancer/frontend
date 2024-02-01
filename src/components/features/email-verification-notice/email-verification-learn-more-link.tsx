'use client'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const EmailVerificationLearnMoreLink = ({ userId }: { userId: number }) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <span className="link-orange" onClick={() => dialog.open(<ClaimEmailError userId={userId} />)}>
            {t('email_verification_notice.learn_more_link')}
        </span>
    )
}
