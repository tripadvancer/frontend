import { MapIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { UserMenuWithAuth } from '@/components/features/layout/user-menu/user-menu-with-auth'

import { HeaderAddPlaceWithAuth } from './components/header-add-place-with-auth'
import { HeaderLogo } from './components/header-logo'
import { HeaderMobileMenu } from './components/header-mobile-menu'
import { HeaderSignIn } from './components/header-signin'

export const HeaderMobile = async () => {
    const t = await getTranslations()

    return (
        <div className="container relative flex h-14 items-center justify-between gap-x-6 sm:hidden">
            <div className="flex-center gap-x-4">
                <HeaderMobileMenu />
                <HeaderLogo />
            </div>

            <div className="flex-center gap-x-2">
                <Link href="/maps">
                    <MapIcon />
                </Link>
                <HeaderAddPlaceWithAuth />
                <UserMenuWithAuth signInComponent={<HeaderSignIn />} />
            </div>
        </div>
    )
}
