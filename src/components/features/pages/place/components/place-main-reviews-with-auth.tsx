import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import type { IPlace } from '@/utils/types/place'

import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { PlaceMainReviews } from './place-main-reviews'

export const PlaceMainReviewsWithAuth = async ({ place }: { place: IPlace }) => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <PlaceMainReviews place={place} isAuth={false} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const isEmailVerified = await session.getClaimValue(EmailVerificationClaim)
    const activeUserId = session.getAccessTokenPayload().userId

    return (
        <PlaceMainReviews place={place} activeUserId={activeUserId} isAuth={true} isEmailVerified={isEmailVerified} />
    )
}
