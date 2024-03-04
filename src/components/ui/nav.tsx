'use client'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavProps = {
    links: {
        href: string
        caption: string
    }[]
    className?: string
}

export const Nav = ({ links, className }: NavProps) => {
    const pathname = usePathname()

    return (
        <nav className={classNames('flex gap-x-4 text-big-bold', className)}>
            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={classNames('whitespace-nowrap', {
                        'border-b-2 border-black-100 text-black-100 hover:text-black-100': pathname.includes(link.href),
                    })}
                >
                    {link.caption}
                </Link>
            ))}
        </nav>
    )
}
