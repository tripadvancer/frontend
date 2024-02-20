'use client'

import type { IUserInfo } from '@/utils/types/user'

import { SignIn } from '@/components/features/auth/sign-in'
import { Avatar } from '@/components/ui/avatar'
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
                {isMenuOpened ? (
                    // prettier-ignore
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M13.4545 12L20 18.5455L18.5455 20L12 13.4545L5.45455 20L4 18.5455L10.5455 12L4 5.45455L5.45455 4L12 10.5455L18.5455 4L20 5.45455L13.4545 12Z" />
                    </svg>
                ) : (
                    <Avatar size={24} {...userInfo} />
                )}
            </div>
        )
    }

    return (
        <div className="cursor-pointer" onClick={() => dialog.open(<SignIn />)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M12 15C9.76086 15 8 13.4274 8 10C8 7.75576 9.5791 6 12 6C14.4142 6 16 7.92158 16 10.2C16 13.4796 14.2181 15 12 15ZM10 10C10 12.2693 10.8182 13 12 13C13.1777 13 14 12.2984 14 10.2C14 8.95042 13.2157 8 12 8C10.7337 8 10 8.81582 10 10Z"
                />
                <path
                    fillRule="evenodd"
                    d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM19.3995 17.1246C20.4086 15.6703 21 13.9042 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.9042 3.59138 15.6703 4.6005 17.1246C5.72595 15.6381 8.3706 15 12 15C15.6294 15 18.274 15.6381 19.3995 17.1246ZM17.9647 18.7398C17.672 17.6874 15.5694 17 12 17C8.43062 17 6.328 17.6874 6.03532 18.7398C7.6233 20.1462 9.71194 21 12 21C14.2881 21 16.3767 20.1462 17.9647 18.7398Z"
                />
            </svg>
        </div>
    )
}
