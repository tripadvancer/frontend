import type { Metadata } from 'next/types'

import { UserReviews } from '@/components/features/user-reviews/user-reviews'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: 'Written Reviews',
        alternates: {
            canonical: `/users/${params.id}/reviews`,
        },
    }
}

export default async function UserReviewsPage({ params }: { params: { id: string } }) {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <UserReviews userId={parseInt(params.id)} isAuth={false} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const activeUserId = session.getAccessTokenPayload().userId

    return <UserReviews userId={parseInt(params.id)} activeUserId={activeUserId} isAuth={true} />
}
