import { ReactNode } from 'react'

import type { Metadata } from 'next/types'

import { User } from '@/components/features/pages/user/user'
import { getUserByUsername } from '@/services/users'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params

    return {
        title: {
            template: `%s | ${params.username} | Tripadvancer`,
            default: params.username,
        },
    }
}

export default async function UserLayout(props: { params: Params; children: ReactNode }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return <User user={user}>{props.children}</User>
}
