import { Tabs } from '@/components/page-switcher'
import { getScopedI18n } from '@/utils/i18n/i18n.server'

type PrivateUserTabsProps = {
    userId: number
}

export const PrivateUserTabs = async ({ userId }: PrivateUserTabsProps) => {
    const t = await getScopedI18n('pages.user')

    const nav = [
        { href: `/users/${userId}`, caption: t('link.places') },
        { href: `/users/${userId}/reviews`, caption: t('link.reviews') },
        { href: `/users/${userId}/settings`, caption: t('link.settings') },
    ]

    return <Tabs nav={nav} className="mb-8" />
}
