'use client'

import { ChangeEmail } from '@/components/features/auth/change-email'
import { useDialog } from '@/components/providers/dialog-provider'

export const UserSettingsBlockChangeEmail = () => {
    const dialog = useDialog()

    return (
        <div className="border-black-15 flex flex-col gap-y-4 border-t py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="h7">Email</div>
                <div
                    className="link font-medium"
                    onClick={() => {
                        dialog.open(<ChangeEmail />)
                    }}
                >
                    Change email
                </div>
            </div>
            <div>Your email will be used for signing in, receiving notifications and resetting your password.</div>
        </div>
    )
}
