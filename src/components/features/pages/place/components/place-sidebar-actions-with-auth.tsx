import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'
import { GeoJsonPoint } from '@/utils/types/geo'

import { PlaceSidebarActions } from './place-sidebar-actions'

type PlaceSidebarActionsWithAuthProps = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    author: {
        id: number
        name: string
        avatar: string | null
    }
    location: GeoJsonPoint
}

export const PlaceSidebarActionsWithAuth = async (props: PlaceSidebarActionsWithAuthProps) => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <PlaceSidebarActions {...props} isAuth={false} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const activeUserId = session.getAccessTokenPayload().userId

    return <PlaceSidebarActions {...props} activeUserId={activeUserId} isAuth={true} />
}
