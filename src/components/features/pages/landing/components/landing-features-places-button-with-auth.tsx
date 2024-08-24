import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { LandingFeaturesPlacesButton } from './landing-features-places-button'

export const LandingFeaturesPlacesButtonWithAuth = async () => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <LandingFeaturesPlacesButton isAuth={false} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const isEmailVerified = await session.getClaimValue(EmailVerificationClaim)
    const activeUserId = session.getAccessTokenPayload().userId

    return <LandingFeaturesPlacesButton activeUserId={activeUserId} isAuth={true} isEmailVerified={isEmailVerified} />
}
