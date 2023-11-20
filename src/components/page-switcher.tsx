'use client'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type PageSwitcherProps = {
    nav: {
        href: string
        caption: string
    }[]
    className?: string
}

export const Tabs = async ({ nav, className }: PageSwitcherProps) => {
    const pathname = usePathname()

    return (
        <nav className={classNames('flex gap-x-4 text-big-bold', className)}>
            {nav.map(item => {
                const isActive = pathname === item.href

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={classNames('whitespace-nowrap', {
                            'border-b-2 border-black-100 text-black-100 hover:text-black-100': isActive,
                        })}
                    >
                        {item.caption}
                    </Link>
                )
            })}
        </nav>
    )
}
