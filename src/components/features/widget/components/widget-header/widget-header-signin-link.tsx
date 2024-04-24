'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { UserIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'

export const WidgetHeaderSignInLink = () => {
    const dialog = useDialog()

    return (
        <div className="cursor-pointer" onClick={() => dialog.open(<SignIn />)}>
            <UserIcon24 />
        </div>
    )
}
