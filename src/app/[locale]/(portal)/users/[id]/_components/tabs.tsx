import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { TabsPrivate } from './tabs-private'
import { TabsPublic } from './tabs-public'
import { TabsSkeleton } from './tabs-skeleton'

type TabsProps = {
    userId: number
}

export const Tabs = async ({ userId }: TabsProps) => {
    const { session, hasToken, hasInvalidClaims } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            return <TabsPublic userId={userId} />
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
            return <TabsPublic userId={userId} />
        } else {
            /**
             * This means that the session does not exist but we have session tokens for the user. In this case
             * the `TryRefreshComponent` will try to refresh the session.
             */
            return <TryRefreshComponent fallback={<TabsSkeleton />} />
        }
    }

    const user = await getUserInfo(session.getAccessToken())

    if (userId !== user.id) {
        return <TabsPublic userId={userId} />
    }

    return <TabsPrivate userId={userId} />
}
