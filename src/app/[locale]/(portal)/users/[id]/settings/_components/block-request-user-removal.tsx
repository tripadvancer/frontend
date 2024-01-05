'use client'

import { Confirmation } from '@/components/confirmation'
import { ButtonMinor } from '@/components/forms/button-minor/button-minor'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { requestUserRemoval } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

export const BlockRequestUserRemoval = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const handleRequestUserRemoval = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirm.request_user_removal.title')}
                message={t('confirm.request_user_removal.message')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestUserRemoval()
                        toast.success(t('success.request_user_removal'))
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
                <p className="font-medium">{t('pages.user.account.request_user_removal.title')}</p>
                <p>{t('pages.user.account.request_user_removal.text')}</p>
            </div>
            <div>
                <ButtonMinor variant="red" onClick={handleRequestUserRemoval}>
                    {t('pages.user.account.request_user_removal.action')}
                </ButtonMinor>
            </div>
        </div>
    )
}
