import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { getUserById } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { HeaderButtonAddPlace } from './header-button-add-place'
import { HeaderButtonSignIn } from './header-button-signin'
import { HeaderUser } from './header-user'

export const HeaderButtons = async () => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return (
                <>
                    <HeaderButtonAddPlace isAuth={false} />
                    <HeaderButtonSignIn />
                </>
            )
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const isEmailVerified = await session?.getClaimValue(EmailVerificationClaim)
    const activeUserId = session.getAccessTokenPayload().userId
    const user = await getUserById(activeUserId)

    return (
        <>
            <HeaderButtonAddPlace activeUserId={activeUserId} isAuth={true} isEmailVerified={isEmailVerified} />
            <HeaderUser user={user} />
        </>
    )
}
