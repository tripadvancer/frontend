'use client'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Tab = {
    label: string
    href: string
}

type TabsProps = {
    tabs: Tab[]
    className?: string
}

export const Tabs = ({ tabs, className }: TabsProps) => {
    const pathname = usePathname()

    return (
        <nav className={`flex flex-row ${className}`}>
            {tabs.map(tab => {
                const isActive = pathname === tab.href

                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={classNames(
                            'flex h-14 basis-1/2 items-center justify-center rounded-t-2xl text-sm uppercase transition-colors duration-300 ease-in-out hover:bg-white/100',
                            {
                                'bg-white/100': isActive,
                                'bg-white/70': !isActive,
                            },
                        )}
                    >
                        {tab.label}
                    </Link>
                )
            })}
        </nav>
    )
}
