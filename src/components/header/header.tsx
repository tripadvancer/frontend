import { LanguageChanger } from './language-changer'
import { Logo } from './logo'
import { MapLink } from './map-link'
import { SignIn } from './signin'

export const Header = async () => {
    return (
        <header className="sticky top-0 z-40 h-[56px] bg-blue-20 sm:h-[76px]">
            <div className="container relative flex h-full items-center justify-between">
                <MapLink />
                <Logo />
                <div className="flex gap-x-4 sm:gap-x-6">
                    <SignIn />
                    <LanguageChanger />
                </div>
            </div>
        </header>
    )
}
