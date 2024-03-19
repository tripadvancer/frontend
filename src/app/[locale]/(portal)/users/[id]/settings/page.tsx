import type { Metadata } from 'next/types'

import { UserSettings } from '@/components/features/user-settings/user-settings'
import { ProtectClientRoute } from '@/components/ui/protect-client-route'
import { getUserById } from '@/services/users'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const user = await getUserById(params.id)

    return {
        title: 'Settings',
        alternates: {
            canonical: `/users/${params.id}/settings`,
        },
    }
}

export default function UserSettingsPage({ params }: { params: { id: string } }) {
    return (
        <ProtectClientRoute userId={parseInt(params.id)}>
            <UserSettings userId={params.id} />
        </ProtectClientRoute>
    )
}
