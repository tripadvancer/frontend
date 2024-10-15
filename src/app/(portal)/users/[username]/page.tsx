import type { Metadata } from 'next/types'

import { UserProfilePrivate } from '@/components/features/pages/user-profile/user-profile-private'
import { UserProfilePublic } from '@/components/features/pages/user-profile/user-profile-public'
import { getUserByUsername } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        alternates: {
            canonical: `/users/${params.id}`,
        },
    }
}

export default async function UserProfilePage({ params }: { params: { username: string } }) {
    const user = await getUserByUsername(params.username)
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <UserProfilePublic user={user} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    if (session.getAccessTokenPayload().userId !== user.id) {
        return <UserProfilePublic user={user} />
    }

    return <UserProfilePrivate user={user} />
}
