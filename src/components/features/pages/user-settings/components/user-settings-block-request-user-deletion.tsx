'use client'

import { useTranslations } from 'next-intl'

import { RequestUserDeletionCompleting } from '@/components/features/auth/request-user-deletion-completing'
import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { userAPI } from '@/utils/redux/services/user/user.api'

export const UserSettingsBlockRequestUserDeletion = () => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const [requestUserDeletion] = userAPI.useRequestUserDeletionMutation()

    const handleRequestUserDeletion = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirmation.requestUserDeletion.title')}
                message={t('confirmation.requestUserDeletion.text')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestUserDeletion()
                        dialog.open(<RequestUserDeletionCompleting />)
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
                <div className="h7">{t('page.user.account.requestUserDeletion.title')}</div>
                <div className="link-red font-medium" onClick={handleRequestUserDeletion}>
                    {t('page.user.account.requestUserDeletion.action')}
                </div>
            </div>
            <div>{t('page.user.account.requestUserDeletion.text')}</div>
        </div>
    )
}
