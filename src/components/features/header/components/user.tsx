'use client'

import Session from 'supertokens-web-js/recipe/session'

import { Avatar } from '@/components/ui/avatar'
import { getIsAuth } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { userAPI } from '@/redux/services/user-api'

import { SignInLink } from './signin-link'
import { UserMenu } from './user-menu'

export const User = () => {
    const isAuth = useAppSelector(getIsAuth)
    const userInfo = userAPI.useGetUserInfoQuery(undefined, { skip: !isAuth }).data

    if (userInfo) {
        return (
            <UserMenu userId={userInfo.id}>
                <div className="link flex gap-x-2 text-big-bold">
                    <div className="hidden sm:block">{userInfo.name}</div>
                    <Avatar {...userInfo} size={24} />
                </div>
            </UserMenu>
        )
    }

    return <SignInLink />
}
