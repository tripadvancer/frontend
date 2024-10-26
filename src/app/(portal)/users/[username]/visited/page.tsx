import type { Metadata } from 'next/types'

import { UserVisitedPrivate } from '@/components/features/pages/user-visited/user-visited-private'
import { UserVisitedPublic } from '@/components/features/pages/user-visited/user-visited-public'
import { getUserByUsername } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: 'Visited Countries',
        alternates: {
            canonical: `/users/${params.id}/visited`,
        },
    }
}

export default async function UserVisitedPage({ params }: { params: { username: string } }) {
    const user = await getUserByUsername(params.username)
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <UserVisitedPublic user={user} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    if (session.getAccessTokenPayload().userId !== user.id) {
        return <UserVisitedPublic user={user} />
    }

    return <UserVisitedPrivate user={user} />
}
