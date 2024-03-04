'use client'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const EmailVerificationNotice = ({ userId }: { userId: number }) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="relative z-50 bg-orange-10 py-2 text-center text-small text-black-70">
            <div className="container">
                {t('email_verification_notice.text', {
                    learn_more_link: (
                        <span className="link-orange" onClick={() => dialog.open(<ClaimEmailError userId={userId} />)}>
                            {t('email_verification_notice.learn_more_link')}
                        </span>
                    ),
                })}
            </div>
        </div>
    )
}
