import { Nav } from '@/components/nav'
import { useI18n } from '@/utils/i18n/i18n.client'

type NavigationPublicProps = {
    userId: number
}

export const NavigationPublic = ({ userId }: NavigationPublicProps) => {
    const t = useI18n()

    const links = [
        { href: `/users/${userId}`, caption: t('user_tabs.places') },
        { href: `/users/${userId}/reviews`, caption: t('user_tabs.reviews') },
    ]

    return <Nav links={links} className="mb-8" />
}
