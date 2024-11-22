import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { LandingHeroJoinButton } from './landing-hero-join-button'
import { LandingHeroSharePlaceButton } from './landing-hero-share-place-button'

export const LandingJoinButtonWithAuth = async () => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <LandingHeroJoinButton />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const isEmailVerified = await session.getClaimValue(EmailVerificationClaim)
    const activeUserId = session.getAccessTokenPayload().userId

    return <LandingHeroSharePlaceButton activeUserId={activeUserId} isAuth={true} isEmailVerified={isEmailVerified} />
}
