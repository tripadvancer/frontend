'use client'

import { ChangeEmail } from '@/components/features/auth/change-email'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SettingsAccountBlock } from './settings-account-block'

export const BlockChangeEmail = () => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <SettingsAccountBlock
            title={t('pages.user.account.change_email.title')}
            info={t('pages.user.account.change_email.info')}
            action={t('pages.user.account.change_email.action')}
            onClick={() => dialog.open(<ChangeEmail />)}
        />
    )
}
