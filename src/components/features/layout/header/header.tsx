import { EmailVerificationWithAuth } from '@/components/features/banners/email-verification/email-verification-with-auth'
import { UserMenuWithAuth } from '@/components/features/layout/user-menu/user-menu-with-auth'

import { HeaderAddPlaceWithAuth } from './components/header-add-place-with-auth'
import { HeaderLogo } from './components/header-logo'
import { HeaderMap } from './components/header-map'
import { HeaderNav } from './components/header-nav'
import { HeaderSignIn } from './components/header-signin'

export const Header = () => {
    return (
        <>
            <div className="absolute left-0 right-0 top-0 -z-10 h-[200px] bg-blue-20" />
            <header className="sticky top-0 z-50 bg-blue-20">
                <EmailVerificationWithAuth />
                <div className="container relative flex h-[56px] items-center justify-between gap-x-6 sm:h-[76px]">
                    <HeaderLogo />

                    {/* <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform sm:block"> */}
                    {/* <HeaderMap /> */}
                    {/* </nav> */}

                    <div className="flex items-center gap-x-6">
                        <HeaderNav />
                        <div className="flex items-center gap-x-2">
                            <div className="block sm:hidden">
                                <HeaderMap />
                            </div>
                            <HeaderAddPlaceWithAuth />
                            <UserMenuWithAuth signInComponent={<HeaderSignIn />} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
