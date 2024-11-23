import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'

import { UserSettings } from '@/components/features/pages/user-settings/user-settings'
import { getUserByUsername } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params

    return {
        title: 'Settings',
        alternates: {
            canonical: `/users/${params.username.toLowerCase()}/settings`,
        },
    }
}

export default async function UserSettingsPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

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

    return <UserSettings name={user.name} info={user.info} avatar={user.avatar} social={user.social} />
}
