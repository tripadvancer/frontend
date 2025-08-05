'use client'

import { RefObject, useRef, useState } from 'react'

import {
    ChevronRightIcon,
    CircleUserIcon,
    LogOutIcon,
    MapPinPlusIcon,
    MenuIcon,
    SettingsIcon,
    XIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useOnClickOutside } from 'usehooks-ts'

import Link from 'next/link'

import { HeaderSearch } from './header-search/header-search'

export const HeaderMobileMenu = () => {
    const t = useTranslations()
    const [isOpen, setIsOpen] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const toggleMenu = () => {
        setIsOpen(prev => !prev)
    }

    // TODO: Consider switching to a different package or waiting for a fix
    // Issue: `useOnClickOutside` does not support a `null` ref
    // More details: https://github.com/juliencrn/usehooks-ts/issues/663
    useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
        if (isOpen) {
            setIsOpen(false)
        }
    })

    return (
        <>
            <div className="hover-animated cursor-pointer hover:text-blue-active" onClick={toggleMenu}>
                {isOpen ? <XIcon /> : <MenuIcon />}
            </div>

            {isOpen && (
                <div className="fixed bottom-0 left-0 right-0 top-14 space-y-6 bg-blue-20 px-4 pb-8 pt-2" ref={ref}>
                    <HeaderSearch />

                    <nav className="flex flex-col gap-y-4 px-1 text-big">
                        <Link href="/maps" className="flex items-center justify-between gap-x-2">
                            {t('layout.header.links.map')}
                            <ChevronRightIcon size={20} />
                        </Link>
                        <Link href="/countries" className="flex items-center justify-between gap-x-2">
                            Explore World
                            <ChevronRightIcon size={20} />
                        </Link>
                        <Link href="/about" className="flex items-center justify-between gap-x-2">
                            About Tripadvancer
                            <ChevronRightIcon size={20} />
                        </Link>
                    </nav>

                    <hr className="border-t border-blue-80" />

                    <nav className="flex flex-col gap-y-4 text-big">
                        <Link href="/about" className="flex items-center justify-between gap-x-2">
                            Profile
                            <CircleUserIcon size={20} />
                        </Link>

                        <Link href="/about" className="flex items-center justify-between gap-x-2">
                            Settings
                            <SettingsIcon size={20} />
                        </Link>

                        <Link href="/places/add" className="flex items-center justify-between gap-x-2">
                            {t('layout.header.links.addPlace')}
                            <MapPinPlusIcon size={20} />
                        </Link>

                        <Link
                            href="/about"
                            className="flex items-center justify-between gap-x-2 text-red-100 hover:text-red-active"
                        >
                            Log Out
                            <LogOutIcon size={20} />
                        </Link>
                    </nav>
                </div>
            )}
        </>
    )
}
