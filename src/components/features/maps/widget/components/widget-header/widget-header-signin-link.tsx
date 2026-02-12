'use client'

import { CircleUserIcon } from 'lucide-react'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'

export const WidgetHeaderSignInLink = () => {
    const dialog = useDialog()

    return (
        <div
            className="hover-animated cursor-pointer text-blue-100 hover:text-blue-active"
            onClick={() => dialog.open(<SignIn />)}
        >
            <CircleUserIcon />
        </div>
    )
}
