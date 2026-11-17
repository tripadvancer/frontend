import { withAuth } from '@/utils/supertokens/with-auth'
import { IUser } from '@/utils/types/user'

import { UserNavigationPrivate } from './user-navigation-private'
import { UserNavigationPublic } from './user-navigation-public'

export const UserNavigation = async ({ user }: { user: IUser }) => {
    return withAuth({
        render: ({ auth }) =>
            auth.activeUserId === user.id ? (
                <UserNavigationPrivate user={user} />
            ) : (
                <UserNavigationPublic user={user} />
            ),
    })
}
