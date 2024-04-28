'use client'

import type { IUser } from '@/utils/types/user'

import { Avatar } from '@/components/ui/avatar'
import { CloseIcon24 } from '@/components/ui/icons'
import { getWidgetState, toggleWidgetMenu } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const WidgetHeaderUserMenuToggler = (user: IUser) => {
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div
            className="hover-animated cursor-pointer hover:text-blue-active"
            onClick={() => dispatch(toggleWidgetMenu())}
        >
            {widgetState.isMenuOpened ? <CloseIcon24 /> : <Avatar size={24} {...user} />}
        </div>
    )
}
