'use client'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { useDialog } from '@/components/providers/dialog-provider'

export const EmailVerification = () => {
    const dialog = useDialog()

    return (
        <div className="relative bg-orange-10 py-2 text-small text-black-70">
            <div className="container text-center">
                {
                    <>
                        Your email is not{' '}
                        {
                            <span className="link-orange" onClick={() => dialog.open(<ClaimEmailError />)}>
                                verified
                            </span>
                        }
                        . Please confirm you email to get access to all features Tripadvancer.
                    </>
                }
            </div>
        </div>
    )
}
