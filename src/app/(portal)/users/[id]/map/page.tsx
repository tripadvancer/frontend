import type { Metadata } from 'next/types'

import { UserMap } from '@/components/features/pages/user-map/user-map'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: 'Map',
        alternates: {
            canonical: `/users/${params.id}/map`,
        },
    }
}

export default function UserMapPage({ params }: { params: { id: string } }) {
    return <UserMap userId={parseInt(params.id)} />
}
