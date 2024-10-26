'use client'

import { useTranslations } from 'next-intl'

import { Nav } from '@/components/ui/nav'

export const UserNavigationPrivate = ({ username }: { username: string }) => {
    const t = useTranslations()

    const links = [
        { href: `/users/${username}/visited`, caption: t('page.user.tabs.visited') },
        { href: `/users/${username}/places`, caption: t('page.user.tabs.places') },
        { href: `/users/${username}/reviews`, caption: t('page.user.tabs.reviews') },
        { href: `/users/${username}/settings`, caption: t('page.user.tabs.settings') },
    ]

    return <Nav links={links} className="mb-8" />
}
