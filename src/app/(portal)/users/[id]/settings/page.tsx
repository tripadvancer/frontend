import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'

import { UserSettings } from '@/components/features/pages/user-settings/user-settings'
import { getUserById } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: 'Settings',
        alternates: {
            canonical: `/users/${params.id}/settings`,
        },
    }
}

export default async function UserSettingsPage({ params }: { params: { id: string } }) {
    const user = await getUserById(params.id)
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return notFound()
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    if (session.getAccessTokenPayload().userId !== user.id) {
        return notFound()
    }

    return <UserSettings userId={params.id} />
}
