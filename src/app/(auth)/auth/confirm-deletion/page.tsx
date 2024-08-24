import type { Metadata } from 'next/types'

import { ConfirmUserDeletion } from '@/components/features/auth/confirm-user-deletion'

export const metadata: Metadata = {
    title: 'Confirm User Deletion',
    alternates: {
        canonical: 'auth/confirm-deletion',
    },
}

export default async function ConfirmUserDeletionPage({ searchParams }: { searchParams: { token: string } }) {
    return <ConfirmUserDeletion token={searchParams.token} />
}
