'use client'

import { Confirmation } from '@/components/ui/confirmation'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { requestPersonalData } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SettingsAccountBlock } from './settings-account-block'

export const BlockRequestPersonalData = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const handleRequestPersonalData = () => {
        dialog.open(
            <Confirmation
                title={t('confirm.request_personal_data.title')}
                message={t('confirm.request_personal_data.message')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestPersonalData()
                        toast.success(t('success.request_personal_data'))
                    } catch {
                        toast.error(t('common.error'))
                    }
                }}
            />,
        )
    }

    return (
        <SettingsAccountBlock
            title={t('pages.user.account.request_personal_data.title')}
            info={t('pages.user.account.request_personal_data.info')}
            action={t('pages.user.account.request_personal_data.action')}
            onClick={handleRequestPersonalData}
        />
    )
}
