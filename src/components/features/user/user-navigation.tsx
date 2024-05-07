import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { UserNavigationPrivate } from './user-navigation-private'
import { UserNavigationPublic } from './user-navigation-public'

export const UserNavigation = async ({ userId }: { userId: string }) => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <UserNavigationPublic userId={userId} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    if (session.getAccessTokenPayload().userId === Number(userId)) {
        return <UserNavigationPrivate userId={userId} />
    }

    return <UserNavigationPublic userId={userId} />
}
