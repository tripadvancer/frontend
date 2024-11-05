import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { PlaceMainReviews } from './place-main-reviews'

type PlaceMainReviewsWithAuthProps = {
    id: number
}

export const PlaceMainReviewsWithAuth = async ({ id }: PlaceMainReviewsWithAuthProps) => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <PlaceMainReviews placeId={id} isAuth={false} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const isEmailVerified = await session.getClaimValue(EmailVerificationClaim)
    const activeUserId = session.getAccessTokenPayload().userId

    return <PlaceMainReviews placeId={id} activeUserId={activeUserId} isAuth={true} isEmailVerified={isEmailVerified} />
}
