'use client'

import { Confirmation } from '@/components/ui/confirmation'
import { FormButtonMinor } from '@/components/ui/form-button-minor'
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
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 text-black-70">
                <p className="font-medium">{t('pages.user.account.request_personal_data.title')}</p>
                <p>{t('pages.user.account.request_personal_data.text')}</p>
            </div>
            <div>
                <FormButtonMinor variant="blue" onClick={handleRequestPersonalData}>
                    {t('pages.user.account.request_personal_data.action')}
                </FormButtonMinor>
            </div>
        </div>
    )
}
