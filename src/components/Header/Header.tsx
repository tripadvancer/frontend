import { LanguageChanger } from './LanguageChanger'
import { Logo } from './Logo'
import { MapLink } from './MapLink'
import { UserLink } from './UserLink'

export const Header = async () => {
    return (
        <header className="bg-custom-blue-20 px-8 pb-14 pt-6 phone:px-4 phone:pb-12 phone:pt-4">
            <div className="container relative flex h-7 items-center justify-between">
                <MapLink />
                <Logo />
                <div className="flex gap-x-6">
                    <UserLink />
                    <LanguageChanger />
                </div>
            </div>
        </header>
    )
}
