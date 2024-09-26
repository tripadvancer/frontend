'use client'

import { useTranslations } from 'next-intl'

import { Nav } from '@/components/ui/nav'

export const UserNavigationPublic = ({ userId }: { userId: string }) => {
    const t = useTranslations()

    const links = [
        { href: `/users/${userId}`, caption: t('page.user.tabs.profile') },
        { href: `/users/${userId}/places`, caption: t('page.user.tabs.places') },
        { href: `/users/${userId}/reviews`, caption: t('page.user.tabs.reviews') },
    ]

    return <Nav links={links} className="mb-8" />
}
