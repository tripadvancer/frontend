import type { Metadata } from 'next/types'

import { UserProfile } from '@/components/features/pages/user-profile/user-profile'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        alternates: {
            canonical: `/users/${params.id}`,
        },
    }
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
    return <UserProfile userId={params.id} />
}
