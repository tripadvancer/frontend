'use client'

import { ChevronRightIcon, CircleUserIcon, MapPinCheckIcon, PlaneIcon, SettingsIcon, StarIcon } from 'lucide-react'
import { useScrollLock } from 'usehooks-ts'

import Link from 'next/link'

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
    { href: '/countries', label: 'Explore the World' },
    { href: '/about', label: 'About' },
]

const getUserLinks = (username: string) => [
    { href: `/users/${username}`, label: 'Travel journal', icon: PlaneIcon },
    { href: `/users/${username}/places`, label: 'Places', icon: MapPinCheckIcon },
    { href: `/users/${username}/reviews`, label: 'Reviews', icon: StarIcon },
    { href: `/users/${username}/settings`, label: 'Settings', icon: SettingsIcon },
]

const MenuSection = ({ children }: { children: React.ReactNode }) => (
    <>
        <hr className="border-blue-80" />
        <nav className="flex flex-col gap-y-4 font-semibold">{children}</nav>
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
        <div className="fixed bottom-0 left-0 right-0 top-14 space-y-6 bg-blue-20 px-4 pb-8 pt-2">
            <Search />

            <nav className="flex flex-col gap-y-4 font-semibold">
                {publicLinks.map(link => (
                    <HeaderMobileMenuLink
                        key={`header-mobile-menu-public-link-${link.label}`}
                        href={link.href}
                        closeMobileMenu={closeMobileMenu}
                    >
                        {link.label}
                        <ChevronRightIcon size={20} />
                    </HeaderMobileMenuLink>
                ))}
            </nav>

            {isAuth && username && (
                <MenuSection>
                    <Link
                        href={`/users/${username}`}
                        scroll={false}
                        className="flex items-center gap-x-2"
                        onClick={closeMobileMenu}
                    >
                        <CircleUserIcon />
                        {username}
                    </Link>

                    {getUserLinks(username).map(link => {
                        const Icon = link.icon
                        return (
                            <HeaderMobileMenuLink
                                key={`header-mobile-menu-user-link-${link.label}`}
                                href={link.href}
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
