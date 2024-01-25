'use client'

import { Confirmation } from '@/components/ui/confirmation'
import { FormButtonMinor } from '@/components/ui/form-button-minor'
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
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2 text-black-70">
                <p className="font-medium">{t('pages.user.account.request_user_deletion.title')}</p>
                <p>{t('pages.user.account.request_user_deletion.text')}</p>
            </div>
            <div>
                <FormButtonMinor variant="red" onClick={handleRequestUserDeletion}>
                    {t('pages.user.account.request_user_deletion.action')}
                </FormButtonMinor>
            </div>
        </div>
    )
}
