'use client'

import { Confirmation } from '@/components/ui/confirmation'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { requestUserDeletion } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

export const BlockRequestUserDeletion = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const handleRequestUserDeletion = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirm.request_user_deletion.title')}
                message={t('confirm.request_user_deletion.message')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestUserDeletion()
                        toast.success(t('success.request_user_deletion'))
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
                <div className="text-h7-m sm:text-h7">{t('pages.user.account.request_user_deletion.title')}</div>
                <div className="link-red font-medium" onClick={handleRequestUserDeletion}>
                    {t('pages.user.account.request_user_deletion.action')}
                </div>
            </div>
            <div>{t('pages.user.account.request_user_deletion.text')}</div>
        </div>
    )
}
