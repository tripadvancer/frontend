'use client'

import Session from 'supertokens-web-js/recipe/session'

import type { IPlace } from '@/utils/types/place'

import { UserActionsPrivate } from './user-actions-private'
import { UserActionsPublic } from './user-actions-public'

type UserActionsProps = IPlace

export const UserActions = async (place: UserActionsProps) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const userInfo = accessTokenPayload.userInfo

        if (place.author.id === userInfo.id) {
            return <UserActionsPrivate place={place} />
        }
    }

    return <UserActionsPublic placeId={place.id} />
}
