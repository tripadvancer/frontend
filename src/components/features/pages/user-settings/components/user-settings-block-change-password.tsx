'use client'

import { useTranslations } from 'next-intl'

import { ChangePassword } from '@/components/features/auth/change-password'
import { useDialog } from '@/components/providers/dialog-provider'

export const UserSettingsBlockChangePassword = () => {
    const t = useTranslations()
    const dialog = useDialog()

    return (
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="h7">{t('page.user.account.changePassword.title')}</div>
                <div
                    className="link font-medium"
                    onClick={() => {
                        dialog.open(<ChangePassword />)
                    }}
                >
                    {t('page.user.account.changePassword.action')}
                </div>
            </div>
            <div>{t('page.user.account.changePassword.text')}</div>
        </div>
    )
}
