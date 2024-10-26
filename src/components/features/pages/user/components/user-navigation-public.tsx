'use client'

import { useTranslations } from 'next-intl'

import { Nav } from '@/components/ui/nav'

export const UserNavigationPublic = ({ username }: { username: string }) => {
    const t = useTranslations()

    const links = [
        { href: `/users/${username}`, caption: t('page.user.tabs.visited') },
        { href: `/users/${username}/places`, caption: t('page.user.tabs.places') },
        { href: `/users/${username}/reviews`, caption: t('page.user.tabs.reviews') },
    ]

    return <Nav links={links} className="mb-8" />
}
