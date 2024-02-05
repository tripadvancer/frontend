'use client'

import { ChangePassword } from '@/components/features/auth/change-password'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const BlockChangePassword = () => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="text-h7-m sm:text-h7">{t('pages.user.account.change_password.title')}</div>
                <div
                    className="link font-medium"
                    onClick={() => {
                        dialog.open(<ChangePassword />)
                    }}
                >
                    {t('pages.user.account.change_password.action')}
                </div>
            </div>
            <div>{t('pages.user.account.change_password.text')}</div>
        </div>
    )
}
