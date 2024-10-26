import { getTranslations } from 'next-intl/server'

import type { IUser } from '@/utils/types/user'

import { Nav } from '@/components/ui/nav'

export const UserNavigationPublic = async ({ user }: { user: IUser }) => {
    const t = await getTranslations()

    const links: { href: string; caption: string }[] = []

    if (user.publicSettings.show_my_map) {
        links.push({ href: `/users/${user.name}/visited`, caption: t('page.user.tabs.visited') })
    }

    links.push(
        { href: `/users/${user.name}/places`, caption: t('page.user.tabs.places') },
        { href: `/users/${user.name}/reviews`, caption: t('page.user.tabs.reviews') },
    )

    return <Nav links={links} className="mb-8" />
}
