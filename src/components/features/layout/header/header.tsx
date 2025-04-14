import { HeaderDesktop } from './header-desktop'
import { HeaderMobile } from './header-mobile'

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-blue-20">
            <HeaderMobile />
            <HeaderDesktop />
        </header>
    )
}
