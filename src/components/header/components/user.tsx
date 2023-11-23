'use client'

import Session from 'supertokens-web-js/recipe/session'

import { Avatar } from '@/components/avatar/avatar'

import { SignInLink } from './signin-link'
import { UserMenu } from './user-menu'

export const User = async () => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const userInfo = accessTokenPayload.userInfo

        return (
            <UserMenu userId={userInfo.id}>
                <div className="link flex gap-x-2 text-big-bold">
                    <div className="hidden sm:block">{userInfo.name}</div>
                    <Avatar src={userInfo.avatar} size={24} alt="" />
                </div>
            </UserMenu>
        )
    }

    return <SignInLink />
}
