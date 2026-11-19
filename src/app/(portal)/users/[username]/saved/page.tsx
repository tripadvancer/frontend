import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'

import { UserSaved } from '@/components/features/pages/user-saved/user-saved'
import { getUserByUsername } from '@/services/users'
import { withAuth } from '@/utils/supertokens/with-auth'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params

    return {
        title: 'Saved',
        robots: 'noindex, nofollow',
        alternates: {
            canonical: `/users/${params.username.toLowerCase()}/saved`,
        },
    }
}

export default async function UserSavedPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return withAuth({
        onUnauth: 'notFound',
        render: ({ auth }) => (auth.activeUserId === user.id ? <UserSaved /> : notFound()),
    })
}
