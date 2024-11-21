import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { LandingFeaturesSharePlacesButton } from './landing-features-share-places-button'

export const LandingFeaturesSharePlacesButtonWithAuth = async () => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <LandingFeaturesSharePlacesButton isAuth={false} />
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
        <LandingFeaturesSharePlacesButton activeUserId={activeUserId} isAuth={true} isEmailVerified={isEmailVerified} />
    )
}
