import { LanguageChanger } from './LanguageChanger'
import { Logo } from './Logo'
import { MapLink } from './MapLink'
import { UserLink } from './UserLink'

export const Header = async () => {
    return (
        <header className="sm:h-[76px] sticky top-0 z-40 h-[56px] bg-custom-blue-20">
            <div className="container relative flex h-full items-center justify-between">
                <MapLink />
                <Logo />
                <div className="sm:gap-x-6 flex gap-x-4">
                    <UserLink />
                    <LanguageChanger />
                </div>
            </div>
        </header>
    )
}
