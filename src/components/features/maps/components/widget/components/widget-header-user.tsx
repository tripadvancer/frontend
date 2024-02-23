'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { Avatar } from '@/components/ui/avatar'
import { CloseIcon24, UserIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { getWidgetIsMenuOpened, toggleWidgetMenu } from '@/redux/features/map-slice'
import { getIsAuth } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { userAPI } from '@/redux/services/user-api'

export const WidgetHeaderUser = () => {
    const dialog = useDialog()
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(getIsAuth)
    const isMenuOpened = useAppSelector(getWidgetIsMenuOpened)
    const userInfo = userAPI.useGetUserInfoQuery(undefined, { skip: !isAuth }).data

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
