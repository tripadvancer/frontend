'use client'

import type { IUser } from '@/utils/types/user'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { UserNavigationPrivate } from './user-navigation-private'
import { UserNavigationPublic } from './user-navigation-public'

export const UserNavigation = ({ id }: IUser) => {
    const supertokens = useSupertokens()

    if (supertokens.isAuth && supertokens.activeUserId === id) {
        return <UserNavigationPrivate userId={id} />
    }

    return <UserNavigationPublic userId={id} />
}
