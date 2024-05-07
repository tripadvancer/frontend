import { EmailVerification } from '@/components/features/email-verification/email-verification'

import { HeaderButtons } from './components/header-buttons'
import { HeaderLogo } from './components/header-logo'
import { HeaderMenu } from './components/header-menu'
import { HeaderMenuMobile } from './components/header-menu-mobile'
import { HeaderMenuToggler } from './components/header-menu-toggler'

export const Header = () => {
    return (
        <>
            <div className="absolute left-0 right-0 top-0 -z-10 h-[200px] bg-blue-20" />
            <header className="sticky top-0 z-40 bg-blue-20">
                <EmailVerification />
                <div className="container relative flex h-[56px] items-center justify-between gap-x-6 sm:h-[76px]">
                    <div className="flex gap-x-4">
                        <HeaderMenuToggler />
                        <HeaderLogo />
                    </div>

                    <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform sm:block">
                        <HeaderMenu />
                    </nav>

                    <div className="flex items-center gap-x-2">
                        <HeaderButtons />
                    </div>
                </div>
                <HeaderMenuMobile />
            </header>
        </>
    )
}
