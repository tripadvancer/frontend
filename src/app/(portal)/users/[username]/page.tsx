import { redirect } from 'next/navigation'

import { UserVisitedPrivate } from '@/components/features/pages/user-visited/user-visited-private'
import { UserVisitedPublic } from '@/components/features/pages/user-visited/user-visited-public'
import { getUserByUsername } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

type Params = Promise<{ username: string }>

export default async function UserPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            if (user.publicSettings.show_my_map) {
                return <UserVisitedPublic user={user} />
            }

            redirect(`/users/${params.username}/places`)
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    if (session.getAccessTokenPayload().userId === user.id) {
        return <UserVisitedPrivate user={user} />
    }

    if (user.publicSettings.show_my_map) {
        return <UserVisitedPublic user={user} />
    }

    redirect(`/users/${params.username}/places`)
}
