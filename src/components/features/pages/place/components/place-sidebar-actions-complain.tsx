'use client'

import { MessageCircleWarningIcon } from 'lucide-react'

import { SignIn } from '@/components/features/auth/sign-in'
import { ComplainFormPlace } from '@/components/features/dialogs/complain-form/complain-form-place'
import { useDialog } from '@/components/providers/dialog-provider'

type PlaceSidebarActionsComplainProps = {
    id: number
    isAuth: boolean
}

export const PlaceSidebarActionsComplain = ({ id, isAuth }: PlaceSidebarActionsComplainProps) => {
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        dialog.open(<ComplainFormPlace placeId={id} />)
    }

    return (
        <div className="link-red flex items-center gap-x-2 align-top" onClick={handleClick}>
            <MessageCircleWarningIcon />
            Complain about a place
        </div>
    )
}
