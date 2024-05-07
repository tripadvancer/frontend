'use client'

import { Nav } from '@/components/ui/nav'
import { useI18n } from '@/utils/i18n/i18n.client'

export const UserNavigationPrivate = ({ userId }: { userId: string }) => {
    const t = useI18n()

    const links = [
        { href: `/users/${userId}`, caption: t('user.tabs.profile') },
        { href: `/users/${userId}/places`, caption: t('user.tabs.places') },
        { href: `/users/${userId}/reviews`, caption: t('user.tabs.reviews') },
        { href: `/users/${userId}/settings`, caption: t('user.tabs.settings') },
    ]

    return <Nav links={links} className="mb-8" />
}
