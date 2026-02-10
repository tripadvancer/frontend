import { HeaderDesktopAuthWrapper } from './header-desktop/header-mobile-auth-wrapper'
import { HeaderMobileAuthWrapper } from './header-mobile/header-mobile-auth-wrapper'

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-blue-20" data-nosnippet>
            <HeaderMobileAuthWrapper />
            <HeaderDesktopAuthWrapper />
        </header>
    )
}
