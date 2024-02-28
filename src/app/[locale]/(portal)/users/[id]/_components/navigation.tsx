'use client'

import type { IUser } from '@/utils/types/user'

import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { NavigationPrivate } from './navigation-private'
import { NavigationPublic } from './navigation-public'

export const Navigation = ({ id }: IUser) => {
    const supertokens = useSupertokens()

    if (supertokens.isAuth && supertokens.activeUserId === id) {
        return <NavigationPrivate userId={id} />
    }

    return <NavigationPublic userId={id} />
}
