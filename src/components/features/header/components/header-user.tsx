'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { Avatar } from '@/components/ui/avatar'
import { UserIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { getIsAuth } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { userAPI } from '@/redux/services/user-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { HeaderUserMenu } from './header-user-menu'

export const HeaderUser = () => {
    const t = useI18n()
    const dialog = useDialog()
    const isAuth = useAppSelector(getIsAuth)
    const userInfo = userAPI.useGetUserInfoQuery(undefined, { skip: !isAuth }).data

    if (userInfo) {
        return (
            <HeaderUserMenu userId={userInfo.id}>
                <div className="link flex gap-x-2 text-big-bold">
                    <div className="hidden sm:block">{userInfo.name}</div>
                    <Avatar {...userInfo} size={24} />
                </div>
            </HeaderUserMenu>
        )
    }

    return (
        <div className="link flex items-center gap-x-2 text-big-bold" onClick={() => dialog.open(<SignIn />)}>
            <span className="hidden sm:block">{t('common.link.sign_in')}</span>
            <UserIcon24 />
        </div>
    )
}
