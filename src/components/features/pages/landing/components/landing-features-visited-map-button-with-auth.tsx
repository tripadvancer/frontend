import { getUserInfo } from '@/services/user'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-component'

import { LandingFeaturesVisitedMapButton } from './landing-features-visited-map-button'

export const LandingFeaturesVisitedMapButtonWithAuth = async () => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <LandingFeaturesVisitedMapButton isAuth={false} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const userInfo = await getUserInfo()

    return <LandingFeaturesVisitedMapButton username={userInfo.name} isAuth={true} />
}
