'use client'

import { useState } from 'react'

import { MapIcon, MenuIcon, XIcon } from 'lucide-react'

import Link from 'next/link'

import { HeaderLogo } from '../components/header-logo'
import { HeaderMobileMenu } from './components/header-mobile-menu'

type HeaderMobileProps = {
    username: string | null
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const HeaderMobile = (props: HeaderMobileProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const openMobileMenu = () => {
        setIsOpen(true)
    }

    const closeMobileMenu = () => {
        setIsOpen(false)
    }

    return (
        <div className="container relative flex h-14 items-center justify-between gap-x-6 lg:hidden">
            <HeaderLogo closeMobileMenu={closeMobileMenu} />

            <div className="flex-center gap-x-3">
                <Link href="/maps" onClick={closeMobileMenu}>
                    <MapIcon />
                </Link>

                <div className="hover-animated cursor-pointer hover:text-blue-active">
                    {isOpen ? <XIcon onClick={closeMobileMenu} /> : <MenuIcon onClick={openMobileMenu} />}
                </div>

                {isOpen && (
                    <HeaderMobileMenu
                        username={props.username}
                        activeUserId={props.activeUserId}
                        isAuth={props.isAuth}
                        isEmailVerified={props.isEmailVerified}
                        closeMobileMenu={closeMobileMenu}
                    />
                )}
            </div>
        </div>
    )
}
