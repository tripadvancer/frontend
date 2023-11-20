import { Tabs } from '@/components/page-switcher'
import { getI18n } from '@/utils/i18n/i18n.server'

type UserTabsPrivateProps = {
    userId: number
}

export const UserTabsPrivate = async ({ userId }: UserTabsPrivateProps) => {
    const t = await getI18n()

    const nav = [
        { href: `/users/${userId}`, caption: t('user_tabs.places') },
        { href: `/users/${userId}/reviews`, caption: t('user_tabs.reviews') },
        { href: `/users/${userId}/settings`, caption: t('user_tabs.settings') },
    ]

    return <Tabs nav={nav} className="mb-8" />
}
