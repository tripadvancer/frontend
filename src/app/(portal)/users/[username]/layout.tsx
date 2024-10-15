import { ReactNode } from 'react'

import type { Metadata } from 'next/types'

import { User } from '@/components/features/pages/user/user'
import { getUserByUsername } from '@/services/users'

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    return {
        title: {
            template: `%s | ${params.username} | Tripadvancer`,
            default: params.username,
        },
    }
}

export default async function UserLayout({ params, children }: { params: { username: string }; children: ReactNode }) {
    const user = await getUserByUsername(params.username)

    return <User user={user}>{children}</User>
}
