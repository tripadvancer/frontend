import { getTranslations } from 'next-intl/server'

import { Nav } from '@/components/ui/nav'
import { IUser } from '@/utils/types/user'

export const UserNavigationPublic = async ({ user }: { user: IUser }) => {
    const t = await getTranslations()
    const username = user.name.toLowerCase()

    const links: { href: string; caption: string }[] = []

    if (user.publicSettings.show_my_map) {
        links.push({ href: `/users/${username}`, caption: t('page.user.tabs.visited') })
    }

    links.push(
        { href: `/users/${username}/places`, caption: t('page.user.tabs.places') },
        { href: `/users/${username}/reviews`, caption: t('page.user.tabs.reviews') },
    )

    return <Nav links={links} />
}
