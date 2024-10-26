import type { Metadata } from 'next/types'

import { UserCountries } from '@/components/features/pages/user-countries/user-countries'
import { getUserByUsername } from '@/services/users'

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    return {
        title: 'Subscriptions to countries',
        alternates: {
            canonical: `/users/${params.username}/subscriptions`,
        },
    }
}

export default async function UserCountriesPage({ params }: { params: { username: string } }) {
    const user = await getUserByUsername(params.username)
    return <UserCountries userId={user.id} />
}
