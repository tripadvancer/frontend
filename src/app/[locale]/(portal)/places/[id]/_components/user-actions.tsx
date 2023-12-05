'use client'

import Session from 'supertokens-web-js/recipe/session'

import type { IPlace } from '@/utils/types/place'

import { UserActionsPrivate } from './user-actions-private'
import { UserActionsPublic } from './user-actions-public'

type UserActionsProps = IPlace

export const UserActions = async ({ id, author }: UserActionsProps) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const activeUserId = accessTokenPayload.userId

        if (activeUserId === author.id) {
            return <UserActionsPrivate placeId={id} />
        }
    }

    return <UserActionsPublic placeId={id} />
}
