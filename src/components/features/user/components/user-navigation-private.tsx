'use client'

import { Nav } from '@/components/ui/nav'
import { useI18n } from '@/utils/i18n/i18n.client'

export const UserNavigationPrivate = ({ userId }: { userId: string }) => {
    const t = useI18n()

    const links = [
        { href: `/users/${userId}/places`, caption: t('user_tabs.places') },
        { href: `/users/${userId}/reviews`, caption: t('user_tabs.reviews') },
        { href: `/users/${userId}/settings`, caption: t('user_tabs.settings') },
    ]

    return <Nav links={links} className="mb-8" />
}
