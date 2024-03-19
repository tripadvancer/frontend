'use client'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { Notice } from '@/components/ui/notice'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const EmailVerificationNotice = ({ userId }: { userId: number }) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <Notice type="info">
            <p className="text-center">
                {t('email_verification_notice.text', {
                    learn_more_link: (
                        <span className="link-orange" onClick={() => dialog.open(<ClaimEmailError userId={userId} />)}>
                            {t('email_verification_notice.learn_more_link')}
                        </span>
                    ),
                })}
            </p>
        </Notice>
    )
}
