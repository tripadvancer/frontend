import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { UserMenuWithAuth } from '../user-menu/user-menu-with-auth'
import { HeaderAddPlaceWithAuth } from './components/header-add-place-with-auth'
import { HeaderLogo } from './components/header-logo'
import { HeaderSearch } from './components/header-search'
import { HeaderSignIn } from './components/header-signin'

export const HeaderDesktop = async () => {
    const t = await getTranslations()

    return (
        <div className="container relative hidden h-14 items-center justify-between gap-x-6 sm:flex">
            <div className="flex items-center gap-x-8">
                <HeaderLogo />

                <HeaderSearch />

                <nav className="flex gap-x-4">
                    <Link href="/maps" className="flex items-center gap-x-2 text-big">
                        {t('layout.header.links.map')}
                    </Link>
                    <Link href="/countries" className="flex items-center gap-x-2 text-big">
                        {t('layout.header.links.world')}
                    </Link>
                    <Link href="/about" className="flex items-center gap-x-2 text-big">
                        {t('layout.header.links.about')}
                    </Link>
                </nav>
            </div>

            <div className="flex-center gap-x-2">
                <HeaderAddPlaceWithAuth />
                <UserMenuWithAuth signInComponent={<HeaderSignIn />} />
            </div>
        </div>
    )
}
