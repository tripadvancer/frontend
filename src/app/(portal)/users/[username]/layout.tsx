import { ReactNode } from 'react'

import { Metadata } from 'next/types'

import { User } from '@/components/features/pages/user/user'
import { getUserByUsername } from '@/services/users'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return {
        title: {
            template: `%s | ${params.username} | Tripadvancer`,
            default: params.username,
        },
        description:
            user.info ||
            'Join the community of travelers and share your favorite places with others. Track the countries you have visited and plan your next trip.',
        openGraph: {
            title: params.username,
            description:
                user.info ||
                'Join the community of travelers and share your favorite places with others. Track the countries you have visited and plan your next trip.',
            url: `/users/${params.username}`,
        },
        twitter: {
            title: params.username,
            description:
                user.info ||
                'Join the community of travelers and share your favorite places with others. Track the countries you have visited and plan your next trip.',
        },
    }
}

export default async function UserLayout(props: { params: Params; children: ReactNode }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return <User user={user}>{props.children}</User>
}
