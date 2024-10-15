import type { Metadata } from 'next/types'

import { UserPlaces } from '@/components/features/pages/user-places/user-places'
import { getUserByUsername } from '@/services/users'

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    return {
        title: 'Added Places',
        alternates: {
            canonical: `/users/${params.username}/places`,
        },
    }
}

export default async function UserPlacesPage({ params }: { params: { username: string } }) {
    const user = await getUserByUsername(params.username)
    return <UserPlaces userId={user.id} />
}
