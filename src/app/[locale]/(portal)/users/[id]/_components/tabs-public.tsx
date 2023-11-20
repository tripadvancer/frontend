import { Tabs } from '@/components/page-switcher'
import { getI18n } from '@/utils/i18n/i18n.server'

type TabsPublicProps = {
    userId: number
}

export const TabsPublic = async ({ userId }: TabsPublicProps) => {
    const t = await getI18n()

    const nav = [
        { href: `/users/${userId}`, caption: t('user_tabs.places') },
        { href: `/users/${userId}/reviews`, caption: t('user_tabs.reviews') },
    ]

    return <Tabs nav={nav} className="mb-8" />
}
