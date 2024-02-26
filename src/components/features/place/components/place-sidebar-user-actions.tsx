'use client'

import Session from 'supertokens-web-js/recipe/session'

import { GlobalLoading } from '@/components/ui/global-loading'
import { placesAPI } from '@/redux/services/places-api'

import { PlaceSidebarUserActionsPrivate } from './place-sidebar-user-actions-private'
import { PlaceSidebarUserActionsPublic } from './place-sidebar-user-actions-public'

export const PlaceSidebarUserActions = async ({ placeId }: { placeId: string }) => {
    const doesSessionExist = await Session.doesSessionExist()
    const place = placesAPI.useGetPlaceByIdQuery(parseInt(placeId))

    if (place.isSuccess) {
        if (doesSessionExist) {
            const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
            const activeUserId = accessTokenPayload.userId

            if (activeUserId === place.data.author.id) {
                return <PlaceSidebarUserActionsPrivate placeId={parseInt(placeId)} />
            }
        }

        return <PlaceSidebarUserActionsPublic placeId={parseInt(placeId)} />
    }

    return <GlobalLoading />
}
