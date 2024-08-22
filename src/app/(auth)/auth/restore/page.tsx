import type { Metadata } from 'next/types'

import { RestoreUser } from '@/components/features/auth/restore-user'

export const metadata: Metadata = {
    title: 'Restore User',
    alternates: {
        canonical: 'auth/restore',
    },
}

export default async function RestoreUserPage({ searchParams }: { searchParams: { token: string } }) {
    return <RestoreUser token={searchParams.token} />
}
