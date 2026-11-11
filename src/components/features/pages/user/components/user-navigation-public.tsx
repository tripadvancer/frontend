import { Nav } from '@/components/ui/nav'
import { IUser } from '@/utils/types/user'

export const UserNavigationPublic = async ({ user }: { user: IUser }) => {
    const username = user.name.toLowerCase()

    const links: { href: string; caption: string }[] = []

    if (user.publicSettings.show_my_map) {
        links.push({ href: `/users/${username}`, caption: 'Travel journal' })
    }

    links.push(
        { href: `/users/${username}/places`, caption: 'Places' },
        { href: `/users/${username}/reviews`, caption: 'Reviews' },
    )

    return <Nav links={links} />
}
