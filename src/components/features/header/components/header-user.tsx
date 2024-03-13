'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { Avatar } from '@/components/ui/avatar'
import { UserIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { userAPI } from '@/redux/services/user-api'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { HeaderUserMenu } from './header-user-menu'

export const HeaderUser = () => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const dialog = useDialog()
    const response = userAPI.useGetUserInfoQuery(undefined, { skip: !supertokens.isAuth })

    if (response.isSuccess) {
        return (
            <HeaderUserMenu userId={response.data.id}>
                <div className="link flex gap-x-2 text-big-bold">
                    <div className="hidden md:block">{t('header.user_menu.my_profile')}</div>
                    <Avatar {...response.data} size={24} />
                </div>
            </HeaderUserMenu>
        )
    }

    return (
        <div className="link flex items-center gap-x-2 text-big-bold" onClick={() => dialog.open(<SignIn />)}>
            <span className="hidden md:block">{t('common.link.sign_in')}</span>
            <UserIcon24 />
        </div>
    )
}
