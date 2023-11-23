'use client'

import Session from 'supertokens-web-js/recipe/session'

import { NavigationPrivate } from './navigation-private'
import { NavigationPublic } from './navigation-public'

type NavProps = {
    userId: number
}

export const Navigation = async ({ userId }: NavProps) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const userInfo = accessTokenPayload.userInfo

        if (userId === userInfo.id) {
            return <NavigationPrivate userId={userId} />
        }
    }

    return <NavigationPublic userId={userId} />
}
