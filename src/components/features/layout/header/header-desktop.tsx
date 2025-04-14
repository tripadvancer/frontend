import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { UserMenuWithAuth } from '../user-menu/user-menu-with-auth'
import { HeaderAddPlaceWithAuth } from './components/header-add-place-with-auth'
import { HeaderLogo } from './components/header-logo'
import { HeaderSignIn } from './components/header-signin'

export const HeaderDesktop = async () => {
    const t = await getTranslations()

    return (
        <header className="sticky top-0 z-50 bg-blue-20">
            <div className="container relative flex h-14 items-center justify-between gap-x-6">
                <HeaderLogo />

                <div className="flex items-center gap-x-8">
                    <nav className="flex gap-x-2.5">
                        <Link href="/maps" className="flex items-center gap-x-2 text-big">
                            {t('layout.header.links.map')}
                        </Link>
                        <Link href="/countries" className="flex items-center gap-x-2 text-big">
                            {t('layout.header.links.countries')}
                        </Link>
                        <Link href="/about" className="flex items-center gap-x-2 text-big">
                            {t('layout.header.links.about')}
                        </Link>
                    </nav>

                    <div className="flex-center gap-x-2">
                        <HeaderAddPlaceWithAuth />
                        <UserMenuWithAuth signInComponent={<HeaderSignIn />} />
                    </div>
                </div>
            </div>
        </header>
    )
}
