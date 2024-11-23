import { Metadata } from 'next/types'

import { UserReviews } from '@/components/features/pages/user-reviews/user-reviews'
import { getUserByUsername } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params

    return {
        title: 'Written Reviews',
        alternates: {
            canonical: `/users/${params.username.toLowerCase()}/reviews`,
        },
    }
}

export default async function UserReviewsPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <UserReviews userId={user.id} isAuth={false} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const activeUserId = session.getAccessTokenPayload().userId

    return <UserReviews userId={user.id} activeUserId={activeUserId} isAuth={true} />
}
