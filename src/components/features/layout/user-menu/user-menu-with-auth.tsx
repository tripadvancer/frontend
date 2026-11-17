import { ReactNode } from 'react'

import { getUserInfo } from '@/services/user'
import { withAuth } from '@/utils/supertokens/with-auth'

import { UserMenu } from './user-menu'

type UserMenuWithAuthProps = {
    avatarSize?: number
    signInComponent: ReactNode
}

export const UserMenuWithAuth = async ({ avatarSize, signInComponent }: UserMenuWithAuthProps) => {
    return withAuth({
        getAuthData: getUserInfo,
        render: ({ data }) =>
            data ? <UserMenu name={data.name} avatar={data.avatar} avatarSize={avatarSize} /> : signInComponent,
    })
}
