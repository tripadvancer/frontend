import { LanguageChanger } from './LanguageChanger'
import { Logo } from './Logo'
import { MapLink } from './MapLink'
import { UserLink } from './UserLink'

export const Header = async () => {
    return (
        <div className="h-[108px] bg-custom-blue-20 phone:h-[88px]">
            {/* <header className="fixed left-0 right-0 top-0 z-40 h-[76px] bg-custom-blue-20 px-8 phone:h-[56px] phone:px-4"> */}
            <header className="relative z-40 h-[76px] bg-custom-blue-20 phone:h-[56px]">
                <div className="container relative flex h-full items-center justify-between">
                    <MapLink />
                    <Logo />
                    <div className="flex gap-x-6 phone:gap-x-4">
                        <UserLink />
                        <LanguageChanger />
                    </div>
                </div>
            </header>
        </div>
    )
}
