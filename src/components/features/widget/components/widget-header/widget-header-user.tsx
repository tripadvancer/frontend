import { getUserById } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { WidgetHeaderSignInLink } from './widget-header-signin-link'
import { WidgetHeaderUserMenuToggler } from './widget-header-user-menu-togler'

export const WidgetHeaderUser = async () => {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <WidgetHeaderSignInLink />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const userId = session.getAccessTokenPayload().userId
    const user = await getUserById(userId)

    return <WidgetHeaderUserMenuToggler {...user} />
}
