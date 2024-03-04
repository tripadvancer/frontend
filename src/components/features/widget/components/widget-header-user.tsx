'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { Avatar } from '@/components/ui/avatar'
import { CloseIcon24, UserIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { getWidgetState, toggleWidgetMenuOpened } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { userAPI } from '@/redux/services/user-api'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const WidgetHeaderUser = () => {
    const supertokens = useSupertokens()
    const dialog = useDialog()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)
    const response = userAPI.useGetUserInfoQuery(undefined, { skip: !supertokens.isAuth })

    if (response.isSuccess) {
        return (
            <div onClick={() => dispatch(toggleWidgetMenuOpened())}>
                {widgetState.isMenuOpened ? <CloseIcon24 /> : <Avatar size={24} {...response.data} />}
            </div>
        )
    }

    return (
        <div className="cursor-pointer" onClick={() => dialog.open(<SignIn />)}>
            <UserIcon24 />
        </div>
    )
}
