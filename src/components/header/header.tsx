import { LanguageChanger } from './components/language-changer'
import { Logo } from './components/logo'
import { MapLink } from './components/map-link'
import { User } from './components/user'

export const Header = async () => {
    return (
        <header className="sticky top-0 z-40 h-[56px] bg-blue-20 sm:h-[76px]">
            <div className="container relative flex h-full items-center justify-between">
                <MapLink />
                <Logo />
                <div className="flex gap-x-4 sm:gap-x-6">
                    <User />
                    <LanguageChanger />
                </div>
            </div>
        </header>
    )
}
