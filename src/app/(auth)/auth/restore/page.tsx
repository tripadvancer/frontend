import { Metadata } from 'next/types'

import { RestoreUser } from '@/components/features/auth/restore-user'

export const metadata: Metadata = {
    title: 'Restore User',
    alternates: {
        canonical: 'auth/restore',
    },
}

type SearchParams = Promise<{ token: string }>

export default async function RestoreUserPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams
    return <RestoreUser token={searchParams.token} />
}
