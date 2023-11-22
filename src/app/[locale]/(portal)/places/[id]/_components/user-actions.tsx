import type { IPlace } from '@/utils/types/place'

import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { UserActionsPrivate } from './user-actions-private'
import { UserActionsPublic } from './user-actions-public'
import { UserActionsSkeleton } from './user-actions-skeleton'

type ActionsProps = {
    place: IPlace
}

export const UserActions = async ({ place }: ActionsProps) => {
    const { session, hasToken, hasInvalidClaims } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            return <UserActionsPublic placeId={place.id} />
        }

        /**
         * `hasInvalidClaims` indicates that session claims did not pass validation. For example if email
         * verification is required but the user's email has not been verified.
         */
        if (hasInvalidClaims) {
            /**
             * This means that one of the session claims is invalid. You should redirect the user to
             * the appropriate page depending on which claim is invalid.
             */
            return <UserActionsPublic placeId={place.id} />
        } else {
            /**
             * This means that the session does not exist but we have session tokens for the user. In this case
             * the `TryRefreshComponent` will try to refresh the session.
             */
            return <TryRefreshComponent fallback={<UserActionsSkeleton />} />
        }
    }

    const user = await getUserInfo(session.getAccessToken())

    if (place.author.id !== user.id) {
        return <UserActionsPublic placeId={place.id} />
    }

    return <UserActionsPrivate place={place} />
}
