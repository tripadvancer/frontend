import { Metadata } from 'next/types'

import { UserPlaces } from '@/components/features/pages/user-places/user-places'
import { getUserByUsername } from '@/services/users'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'

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
    const { session } = await getSSRSessionHelper()
    const isOwnProfile = session?.getAccessTokenPayload().userId === user.id

    return <UserPlaces userId={user.id} isOwnProfile={isOwnProfile} />
}
