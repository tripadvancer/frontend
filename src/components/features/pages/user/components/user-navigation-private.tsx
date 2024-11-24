import { getTranslations } from 'next-intl/server'

import { Nav } from '@/components/ui/nav'
import { IUser } from '@/utils/types/user'

export const UserNavigationPrivate = async ({ user }: { user: IUser }) => {
    const t = await getTranslations()
    const username = user.name.toLowerCase()

    const links = [
        { href: `/users/${username}`, caption: t('page.user.tabs.visited') },
        { href: `/users/${username}/places`, caption: t('page.user.tabs.places') },
        { href: `/users/${username}/reviews`, caption: t('page.user.tabs.reviews') },
        { href: `/users/${username}/settings`, caption: t('page.user.tabs.settings') },
    ]

    return <Nav links={links} />
}
