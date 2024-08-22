'use client'

import { useTranslations } from 'next-intl'

import { Confirmation } from '@/components/ui/confirmation'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { userAPI } from '@/redux/services/user-api'

export const UserSettingsBlockRequestPersonalData = () => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const [requestPersonalData] = userAPI.useRequestPersonalDataMutation()

    const handleRequestPersonalData = () => {
        dialog.open(
            <Confirmation
                title={t('confirmation.requestPersonalData.title')}
                message={t('confirmation.requestPersonalData.text')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestPersonalData()
                        toast.success(t('success.requestPersonalData'))
                    } catch {
                        toast.error(t('common.error'))
                    }
                }}
            />,
        )
    }

    return (
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="h7">{t('page.user.account.requestPersonalData.title')}</div>
                <div className="link font-medium" onClick={handleRequestPersonalData}>
                    {t('page.user.account.requestPersonalData.action')}
                </div>
            </div>
            <div>{t('page.user.account.requestPersonalData.text')}</div>
        </div>
    )
}
