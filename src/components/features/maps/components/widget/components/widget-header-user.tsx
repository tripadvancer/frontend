'use client'

import type { IUserInfo } from '@/utils/types/user'

import { SignIn } from '@/components/features/auth/sign-in'
import { Avatar } from '@/components/ui/avatar'
import { CloseIcon24, UserIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { getWidgetIsMenuOpened, toggleWidgetMenu } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

type WidgetHeaderUserProps = {
    userInfo: IUserInfo | null
}

export const WidgetHeaderUser = ({ userInfo }: WidgetHeaderUserProps) => {
    const dialog = useDialog()
    const dispatch = useAppDispatch()
    const isMenuOpened = useAppSelector(getWidgetIsMenuOpened)

    if (userInfo) {
        return (
            <div className="cursor-pointer" onClick={() => dispatch(toggleWidgetMenu())}>
                {isMenuOpened ? <CloseIcon24 /> : <Avatar size={24} {...userInfo} />}
            </div>
        )
    }

    return (
        <div className="cursor-pointer" onClick={() => dialog.open(<SignIn />)}>
            <UserIcon24 />
        </div>
    )
}
