import { ReactNode } from 'react'

import { getUserById } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { UserMenu } from './user-menu'

export const UserMenuWithAuth = async ({
    avatarSize,
    signInComponent,
}: {
    avatarSize?: number
    signInComponent: ReactNode
}) => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <>{signInComponent}</>
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const activeUserId = session.getAccessTokenPayload().userId
    const user = await getUserById(activeUserId)

    return <UserMenu user={user} avatarSize={avatarSize} />
}
