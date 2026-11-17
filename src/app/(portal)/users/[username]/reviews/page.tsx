import { Metadata } from 'next/types'

import { UserReviews } from '@/components/features/pages/user-reviews/user-reviews'
import { getUserByUsername } from '@/services/users'
import { withAuth } from '@/utils/supertokens/with-auth'

type Params = Promise<{ username: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params

    return {
        title: 'Written Reviews',
        alternates: {
            canonical: `/users/${params.username.toLowerCase()}/reviews`,
        },
    }
}

export default async function UserReviewsPage(props: { params: Params }) {
    const params = await props.params
    const user = await getUserByUsername(params.username)

    return withAuth({
        render: ({ auth }) => <UserReviews userId={user.id} activeUserId={auth.activeUserId} isAuth={auth.isAuth} />,
    })
}
