'use client'

import { ChangePassword } from '@/components/auth/change-password'
import { ButtonMinor } from '@/components/forms/button-minor/button-minor'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const BlockChangePassword = () => {
    const t = useI18n()
    const dialog = useDialog()

    const handleChangePassword = () => {
        dialog.open(<ChangePassword />)
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 text-black-70">
                <p className="font-medium">{t('pages.user.account.change_password.title')}</p>
                <p>{t('pages.user.account.change_password.text')}</p>
            </div>
            <div>
                <ButtonMinor variant="blue" onClick={handleChangePassword}>
                    {t('pages.user.account.change_password.action')}
                </ButtonMinor>
            </div>
        </div>
    )
}
