import { redirect } from 'next/navigation'

import { getUserByUsername } from '@/services/users'

export default async function UserPage({ params }: { params: { username: string } }) {
    const user = await getUserByUsername(params.username)
    if (user.publicSettings.show_my_map) {
        redirect(`/users/${params.username}/visited`)
    } else {
        redirect(`/users/${params.username}/places`)
    }
}
