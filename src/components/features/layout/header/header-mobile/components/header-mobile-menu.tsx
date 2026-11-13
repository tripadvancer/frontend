'use client'

import { ChevronRightIcon, CircleUserIcon, MapPinCheckIcon, SettingsIcon, StarIcon } from 'lucide-react'
import { useScrollLock } from 'usehooks-ts'

import { Search } from '@/components/features/layout/search/search'

import { HeaderMobileAddPlaceButton } from './header-mobile-add-place-button'
import { HeaderMobileLoginButton } from './header-mobile-login-button'
import { HeaderMobileMenuLink } from './header-mobile-menu-link'
import { HeaderMobileSignoutButton } from './header-mobile-signout-button'

type HeaderMobileMenuProps = {
    username: string | null
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
    closeMobileMenu: () => void
}

const publicLinks = [
    { href: '/maps', label: 'Map' },
    { href: '/about', label: 'About Tripadvancer' },
]

const getUserLinks = (username: string) => [
    { href: `/users/${username}`, label: 'Profile', icon: CircleUserIcon, scroll: false },
    { href: `/users/${username}/places`, label: 'Places', icon: MapPinCheckIcon, scroll: true },
    { href: `/users/${username}/reviews`, label: 'Reviews', icon: StarIcon, scroll: true },
    { href: `/users/${username}/settings`, label: 'Settings', icon: SettingsIcon, scroll: true },
]

const MenuSection = ({ children }: { children: React.ReactNode }) => (
    <>
        <hr className="border-blue-80" />
        <nav className="text-big flex flex-col gap-y-4">{children}</nav>
    </>
)

export const HeaderMobileMenu = ({
    username,
    activeUserId,
    isAuth,
    isEmailVerified,
    closeMobileMenu,
}: HeaderMobileMenuProps) => {
    useScrollLock()

    return (
        <div className="bg-blue-20 fixed top-14 right-0 bottom-0 left-0 space-y-6 px-4 pt-2 pb-8">
            <Search closeMobileMenu={closeMobileMenu} />

            <nav className="text-big flex flex-col gap-y-4">
                {publicLinks.map(link => (
                    <HeaderMobileMenuLink
                        key={`header-mobile-menu-public-link-${link.label}`}
                        href={link.href}
                        scroll={false}
                        closeMobileMenu={closeMobileMenu}
                    >
                        {link.label}
                        <ChevronRightIcon size={20} />
                    </HeaderMobileMenuLink>
                ))}
            </nav>

            {isAuth && username && (
                <MenuSection>
                    {getUserLinks(username).map(link => {
                        const Icon = link.icon
                        return (
                            <HeaderMobileMenuLink
                                key={`header-mobile-menu-user-link-${link.label}`}
                                href={link.href}
                                scroll={link.scroll}
                                closeMobileMenu={closeMobileMenu}
                            >
                                {link.label}
                                <Icon size={20} />
                            </HeaderMobileMenuLink>
                        )
                    })}
                </MenuSection>
            )}

            <MenuSection>
                <>
                    <HeaderMobileAddPlaceButton
                        activeUserId={activeUserId}
                        isAuth={isAuth}
                        isEmailVerified={isEmailVerified}
                        closeMobileMenu={closeMobileMenu}
                    />

                    {isAuth ? (
                        <HeaderMobileSignoutButton closeMobileMenu={closeMobileMenu} />
                    ) : (
                        <HeaderMobileLoginButton closeMobileMenu={closeMobileMenu} />
                    )}
                </>
            </MenuSection>
        </div>
    )
}
