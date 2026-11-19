'use client'

import { CircleUserIcon } from 'lucide-react'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'

export const WidgetHeaderSignInLink = () => {
    const dialog = useDialog()

    return (
        <div
            className="hover-animated hover:text-blue-active cursor-pointer text-blue-100"
            onClick={() => dialog.open(<SignIn />)}
        >
            <CircleUserIcon />
        </div>
    )
}
