'use client'

import { ChangePassword } from '@/components/features/auth/change-password'
import { useDialog } from '@/components/providers/dialog-provider'

export const UserSettingsBlockChangePassword = () => {
    const dialog = useDialog()

    return (
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="h7">{'Password'}</div>
                <div
                    className="link font-medium"
                    onClick={() => {
                        dialog.open(<ChangePassword />)
                    }}
                >
                    {'Change password'}
                </div>
            </div>
            <div>
                {
                    'We recommend that you use a password that is different from your other online accounts and change it from time to time.'
                }
            </div>
        </div>
    )
}
