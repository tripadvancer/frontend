'use client'

import { RefObject, useRef, useState } from 'react'

import { CircleUserIcon, GlobeIcon, InfoIcon, MapIcon, MapPinPlusIcon, MenuIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useOnClickOutside } from 'usehooks-ts'

import Link from 'next/link'

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
                <div className="container absolute left-0 right-0 top-14 bg-blue-20 px-4 pb-8 pt-4" ref={ref}>
                    <nav className="flex flex-col gap-y-4" onClick={toggleMenu}>
                        <Link
                            href="/places/add"
                            className="flex items-center gap-x-2 text-big-bold text-orange-100 hover:text-orange-active"
                        >
                            <MapPinPlusIcon />
                            {t('layout.header.links.addPlace')}
                        </Link>
                        <Link href="/maps" className="flex items-center gap-x-2 text-big-bold">
                            <MapIcon />
                            {t('layout.header.links.map')}
                        </Link>
                        <Link href="/countries" className="flex items-center gap-x-2 text-big-bold">
                            <GlobeIcon />
                            {t('layout.header.links.countries')}
                        </Link>
                        <Link href="/about" className="flex items-center gap-x-2 text-big-bold">
                            <InfoIcon />
                            {t('layout.header.links.about')}
                        </Link>
                    </nav>
                </div>
            )}
        </>
    )
}
