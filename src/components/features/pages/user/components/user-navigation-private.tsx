import { Nav } from '@/components/ui/nav'
import { IUser } from '@/utils/types/user'

export const UserNavigationPrivate = async ({ user }: { user: IUser }) => {
    const username = user.name.toLowerCase()

    const links = [
        { href: `/users/${username}`, caption: 'Travel journal' },
        { href: `/users/${username}/places`, caption: 'Places' },
        { href: `/users/${username}/reviews`, caption: 'Reviews' },
        { href: `/users/${username}/settings`, caption: 'Settings' },
    ]

    return <Nav links={links} />
}
