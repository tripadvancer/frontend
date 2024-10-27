import type { Metadata } from 'next/types'

import { UserPlaces } from '@/components/features/pages/user-places/user-places'
import { getUserByUsername } from '@/services/users'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params

    return {
        title: 'Added Places',
        alternates: {
            canonical: `/users/${params.username}/places`,
        },
    }
}

export default async function UserPlacesPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return <UserPlaces userId={user.id} />
}
