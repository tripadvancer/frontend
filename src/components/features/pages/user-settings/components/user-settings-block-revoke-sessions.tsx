'use client'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { userAPI } from '@/utils/redux/services/user/user.api'

export const UserSettingsBlockRevokeSessions = () => {
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [revokeUserSessions] = userAPI.useRevokeUserSessionsMutation()

    const handleConfirmRevokeSessions = async () => {
        dialog.close()

        try {
            await revokeUserSessions().unwrap()
            await Session.signOut()
            router.replace('/')
            router.refresh()
        } catch {
            toast.error('Unable to sign out of all sessions. Please try again.')
        }
    }

    const handleRevokeSessions = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title="Sign out all sessions?"
                message="This will sign you out on every device, including this one."
                onConfirm={handleConfirmRevokeSessions}
            />,
        )
    }

    return (
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="h7">Active sessions</div>
                <button type="button" className="link-red font-medium" onClick={handleRevokeSessions}>
                    Sign out all sessions
                </button>
            </div>
            <div>Sign out from all devices if you think someone else may have access to your account.</div>
        </div>
    )
}
