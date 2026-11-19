import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'

import { UserSettings } from '@/components/features/pages/user-settings/user-settings'
import { getUserByUsername } from '@/services/users'
import { withAuth } from '@/utils/supertokens/with-auth'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params

    return {
        title: 'Settings',
        robots: 'noindex, nofollow',
        alternates: {
            canonical: `/users/${params.username.toLowerCase()}/settings`,
        },
    }
}

export default async function UserSettingsPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return withAuth({
        onUnauth: 'notFound',
        render: ({ auth }) =>
            auth.activeUserId === user.id ? (
                <UserSettings name={user.name} info={user.info ?? ''} avatar={user.avatar} social={user.social} />
            ) : (
                notFound()
            ),
    })
}
