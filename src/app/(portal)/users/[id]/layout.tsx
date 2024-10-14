import { ReactNode } from 'react'

import type { Metadata } from 'next/types'

import { User } from '@/components/features/pages/user/user'
import { getUserById } from '@/services/users'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const user = await getUserById(params.id)

    return {
        title: {
            template: `%s | ${user.name} | Tripadvancer`,
            default: user.name,
        },
        // robots: 'noindex, nofollow',
    }
}

export default function UserLayout({ params, children }: { params: { id: string }; children: ReactNode }) {
    return <User userId={params.id}>{children}</User>
}
