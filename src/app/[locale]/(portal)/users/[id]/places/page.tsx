import type { Metadata } from 'next/types'

import { UserPlaces } from '@/components/features/user-places/user-places'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: 'Added Places',
        alternates: {
            canonical: `/users/${params.id}/places`,
        },
    }
}

export default function UserPlacesPage({ params }: { params: { id: string } }) {
    return <UserPlaces userId={parseInt(params.id)} />
}
