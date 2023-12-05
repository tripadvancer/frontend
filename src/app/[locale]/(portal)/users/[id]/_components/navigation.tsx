'use client'

import Session from 'supertokens-web-js/recipe/session'

import type { IUser } from '@/utils/types/user'

import { NavigationPrivate } from './navigation-private'
import { NavigationPublic } from './navigation-public'

type NavProps = IUser

export const Navigation = async ({ id }: NavProps) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const activeUserId = accessTokenPayload.userId

        if (activeUserId === id) {
            return <NavigationPrivate userId={id} />
        }
    }

    return <NavigationPublic userId={id} />
}
