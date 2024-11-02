import { getTranslations } from 'next-intl/server'

import { Nav } from '@/components/ui/nav'
import { IUser } from '@/utils/types/user'

export const UserNavigationPrivate = async ({ user }: { user: IUser }) => {
    const t = await getTranslations()

    const links = [
        { href: `/users/${user.name}`, caption: t('page.user.tabs.visited') },
        { href: `/users/${user.name}/places`, caption: t('page.user.tabs.places') },
        { href: `/users/${user.name}/reviews`, caption: t('page.user.tabs.reviews') },
        { href: `/users/${user.name}/settings`, caption: t('page.user.tabs.settings') },
    ]

    return <Nav links={links} />
}
