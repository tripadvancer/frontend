'use client'

import { Confirmation } from '@/components/ui/confirmation'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { requestPersonalData } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

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
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="text-h7-m sm:text-h7">{t('pages.user.account.request_personal_data.title')}</div>
                <div className="link font-medium" onClick={handleRequestPersonalData}>
                    {t('pages.user.account.request_personal_data.action')}
                </div>
            </div>
            <div>{t('pages.user.account.request_personal_data.text')}</div>
        </div>
    )
}
