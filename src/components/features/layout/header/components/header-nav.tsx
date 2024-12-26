import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

export const HeaderNav = async () => {
    const t = await getTranslations()

    return (
        <nav className="hidden gap-x-4 text-big sm:flex">
            <Link href="/maps">{t('layout.header.links.map')}</Link>
            <Link href="/countries">Countries</Link>
            <Link href="/about">About</Link>
        </nav>
    )
}
