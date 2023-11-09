import { Avatar } from '@/components/avatar/avatar'
import { AvatarSkeleton } from '@/components/avatar/avatar-skeleton'
import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { SignInLink } from './signin-link'
import { UserMenu } from './user-menu'

export const User = async () => {
    const { session, hasToken, hasInvalidClaims } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            return <SignInLink />
        }

        /**
         * `hasInvalidClaims` indicates that session claims did not pass validation. For example if email
         * verification is required but the user's email has not been verified.
         */
        if (hasInvalidClaims) {
            /**
             * This means that one of the session claims is invalid. You should redirect the user to
             * the appropriate page depending on which claim is invalid.
             */
            return <SignInLink />
        } else {
            /**
             * This means that the session does not exist but we have session tokens for the user. In this case
             * the `TryRefreshComponent` will try to refresh the session.
             */
            return (
                <TryRefreshComponent
                    fallback={
                        <div className="flex w-32 animate-pulse items-center gap-x-2">
                            <div className="hidden h-4 w-full rounded-full bg-black-5 sm:block" />
                            <AvatarSkeleton size={24} className="flex-none" />
                        </div>
                    }
                />
            )
        }
    }

    const user = await getUserInfo(session.getAccessToken())

    return (
        <UserMenu userId={user.id}>
            <div className="hover-animated flex cursor-pointer gap-x-2 text-big-bold text-blue-100 hover:text-blue-active">
                <div className="hidden sm:block">{user.name}</div>
                <Avatar src={user.avatar} size={24} alt="" />
            </div>
        </UserMenu>
    )
}
