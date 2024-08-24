'use client'

import { useTranslations } from 'next-intl'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { useDialog } from '@/providers/dialog-provider'

export const EmailVerification = ({ userId }: { userId: number }) => {
    const t = useTranslations()
    const dialog = useDialog()

    return (
        <div className="relative bg-orange-10 py-2 text-small text-black-70">
            <div className="container text-center">
                {t.rich('banner.emailVerificationNotice.text', {
                    verifiedLink: verifiedLink => (
                        <span className="link-orange" onClick={() => dialog.open(<ClaimEmailError userId={userId} />)}>
                            {verifiedLink}
                        </span>
                    ),
                })}
            </div>
        </div>
    )
}
