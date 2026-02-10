import Link from 'next/link'

import { Search } from '@/components/features/layout/search/search'
import { UserMenuWithAuth } from '@/components/features/layout/user-menu/user-menu-with-auth'

import { HeaderLogo } from '../components/header-logo'
import { HeaderDesktopAddPlaceButton } from './components/header-desktop-add-place-button'
import { HeaderDesktopLoginButton } from './components/header-desktop-login-button'

type HeaderDesktopProps = {
    username: string | null
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const HeaderDesktop = (props: HeaderDesktopProps) => {
    return (
        <div className="container relative hidden h-16 items-center justify-between gap-x-6 lg:flex">
            <div className="flex items-center gap-x-6">
                <HeaderLogo />
                <Search />

                <nav className="flex gap-x-4">
                    <Link href="/maps" className="flex items-center gap-x-2 text-big-bold">
                        Map
                    </Link>
                    <Link href="/countries" className="flex items-center gap-x-2 text-big-bold">
                        Explore
                    </Link>
                    <Link href="/about" className="flex items-center gap-x-2 text-big-bold">
                        About
                    </Link>
                </nav>
            </div>

            <div className="flex-center gap-x-2">
                <HeaderDesktopAddPlaceButton
                    activeUserId={props.activeUserId}
                    isAuth={props.isAuth}
                    isEmailVerified={props.isEmailVerified}
                />
                <UserMenuWithAuth signInComponent={<HeaderDesktopLoginButton />} />
            </div>
        </div>
    )
}
