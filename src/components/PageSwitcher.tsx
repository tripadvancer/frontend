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

export const PageSwitcher = ({ nav, className }: PageSwitcherProps) => {
    const pathname = usePathname()

    return (
        <nav className={classNames('flex gap-x-4', className)}>
            {nav.map(item => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`${
                        pathname === item.href
                            ? 'border-b-2 border-custom-black-100 text-custom-black-100 hover:text-custom-black-100'
                            : 'text-custom-blue-100'
                    }`}
                >
                    {item.caption}
                </Link>
            ))}
        </nav>
    )
}
