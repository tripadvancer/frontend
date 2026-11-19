import { redirect } from 'next/navigation'

import { UserVisitedPrivate } from '@/components/features/pages/user-visited/user-visited-private'
import { UserVisitedPublic } from '@/components/features/pages/user-visited/user-visited-public'
import { getUserByUsername } from '@/services/users'
import { withAuth } from '@/utils/supertokens/with-auth'

type Params = Promise<{ username: string }>

// The visited map is shown to the owner and, if the user allows it, to everybody else
export default async function UserPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return withAuth({
        render: ({ auth }) => {
            if (auth.activeUserId === user.id) {
                return <UserVisitedPrivate user={user} />
            }

            if (user.publicSettings.show_my_map) {
                return <UserVisitedPublic user={user} />
            }

            redirect(`/users/${params.username.toLowerCase()}/places`)
        },
    })
}
