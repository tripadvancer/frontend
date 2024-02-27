'use client'

import Session from 'supertokens-web-js/recipe/session'

import type { IPlace } from '@/utils/types/place'

import { PlaceSidebarUserActionsPrivate } from './place-sidebar-user-actions-private'
import { PlaceSidebarUserActionsPublic } from './place-sidebar-user-actions-public'

export const PlaceSidebarUserActions = async ({ id, author }: IPlace) => {
    const doesSessionExist = await Session.doesSessionExist()

    if (doesSessionExist) {
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const activeUserId = accessTokenPayload.userId

        if (activeUserId === author.id) {
            return <PlaceSidebarUserActionsPrivate placeId={id} />
        }
    }

    return <PlaceSidebarUserActionsPublic placeId={id} />
}
