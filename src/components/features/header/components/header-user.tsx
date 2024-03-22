import { Avatar } from '@/components/ui/avatar'
import { getUserById } from '@/services/users'
import { getI18n } from '@/utils/i18n/i18n.server'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { HeaderSignInLink } from './header-signin-link'
import { HeaderUserMenu } from './header-user-menu'

export const HeaderUser = async () => {
    const t = await getI18n()
    const { session, hasToken } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <HeaderSignInLink />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const userId = session.getAccessTokenPayload().userId
    const user = await getUserById(userId)

    return (
        <HeaderUserMenu userId={user.id}>
            <div className="link flex gap-x-2 text-big-bold">
                <div className="hidden md:block">{t('header.user_menu.my_profile')}</div>
                <Avatar {...user} size={24} />
            </div>
        </HeaderUserMenu>
    )
}
