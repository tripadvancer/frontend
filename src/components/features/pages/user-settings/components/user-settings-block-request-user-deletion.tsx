'use client'

import { RequestUserDeletionCompleting } from '@/components/features/auth/request-user-deletion-completing'
import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { userAPI } from '@/utils/redux/services/user/user.api'

export const UserSettingsBlockRequestUserDeletion = () => {
    const dialog = useDialog()
    const toast = useToast()

    const [requestUserDeletion] = userAPI.useRequestUserDeletionMutation()

    const handleRequestUserDeletion = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title="Delete your account"
                message="Are you sure you want to delete your account?"
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestUserDeletion()
                        dialog.open(<RequestUserDeletionCompleting />)
                    } catch {
                        toast.error('An unexpected error has occurred. Please try again later.')
                    }
                }}
            />,
        )
    }

    return (
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="h7">Account</div>
                <div className="link-red font-medium" onClick={handleRequestUserDeletion}>
                    Delete account
                </div>
            </div>
            <div>
                You may request deletion of your account and all data associated with it. You will be able to restore
                your account using the link sent to your email before the deletion process is completed.
            </div>
        </div>
    )
}
