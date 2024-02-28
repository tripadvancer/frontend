'use client'

import type { IPlace } from '@/utils/types/place'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { PlaceSidebarUserActionsPrivate } from './place-sidebar-user-actions-private'
import { PlaceSidebarUserActionsPublic } from './place-sidebar-user-actions-public'

export const PlaceSidebarUserActions = ({ id, author }: IPlace) => {
    const supertokens = useSupertokens()

    if (supertokens.isAuth && supertokens.activeUserId === author.id) {
        return <PlaceSidebarUserActionsPrivate placeId={id} />
    }

    return <PlaceSidebarUserActionsPublic placeId={id} />
}
