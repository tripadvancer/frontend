import type { Metadata } from 'next/types'

import { UserProfile } from '@/components/features/pages/user-profile/user-profile'
import { getUserById } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        alternates: {
            canonical: `/users/${params.id}`,
        },
    }
}

export default async function UserProfilePage({ params }: { params: { id: string } }) {
    const user = await getUserById(params.id)
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <UserProfile userId={params.id} type="public" />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    if (session.getAccessTokenPayload().userId !== user.id) {
        return <UserProfile userId={params.id} type="public" />
    }

    return <UserProfile userId={params.id} type="private" />
}
