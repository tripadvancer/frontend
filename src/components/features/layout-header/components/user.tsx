import { Avatar } from '@/components/ui/avatar'
import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { SignInLink } from './signin-link'
import { UserMenu } from './user-menu'

export const User = async () => {
    const { session, hasToken } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            return <SignInLink />
        }

        return <TryRefreshComponent />
    }

    const userInfo = await getUserInfo(session.getAccessToken())

    return (
        <UserMenu userId={userInfo.id}>
            <div className="link flex gap-x-2 text-big-bold">
                <div className="hidden sm:block">{userInfo.name}</div>
                <Avatar {...userInfo} size={24} />
            </div>
        </UserMenu>
    )
}
