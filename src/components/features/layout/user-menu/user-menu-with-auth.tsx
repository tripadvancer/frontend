import { ReactNode } from 'react'

import { getUserInfo } from '@/services/user'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-component'

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

    const userInfo = await getUserInfo()

    return <UserMenu name={userInfo.name} avatar={userInfo.avatar} avatarSize={avatarSize} />
}
