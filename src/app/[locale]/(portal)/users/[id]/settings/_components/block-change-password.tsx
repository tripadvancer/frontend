'use client'

import { ChangePassword } from '@/components/features/auth/change-password'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SettingsAccountBlock } from './settings-account-block'

export const BlockChangePassword = () => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <SettingsAccountBlock
            title={t('pages.user.account.change_password.title')}
            info={t('pages.user.account.change_password.info')}
            action={t('pages.user.account.change_password.action')}
            onClick={() => dialog.open(<ChangePassword />)}
        />
    )
}
