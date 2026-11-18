import { Metadata } from 'next/types'

import { UserPlaces } from '@/components/features/pages/user-places/user-places'
import { getUserInfo } from '@/services/user'
import { getUserByUsername } from '@/services/users'
import { UserRole } from '@/utils/enums'
import { withAuth } from '@/utils/supertokens/with-auth'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params

    return {
        title: 'Added Places',
        alternates: {
            canonical: `/users/${params.username.toLowerCase()}/places`,
        },
    }
}

export default async function UserPlacesPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return withAuth({
        getAuthData: getUserInfo,
        render: ({ auth, data }) => {
            const isOwnProfile = auth.activeUserId === user.id

            return (
                <UserPlaces
                    userId={user.id}
                    isOwnProfile={isOwnProfile}
                    isBotAuthor={isOwnProfile && data?.role === UserRole.BOT}
                />
            )
        },
    })
}
