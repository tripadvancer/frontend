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
        <nav className={classNames('text-big-bold flex gap-x-4', className)}>
            {links.map(link => (
                <Link
                    key={`nav-link-${link.href}`}
                    href={link.href}
                    className={classNames('whitespace-nowrap', {
                        'border-black-100 text-black-100 hover:text-black-100 border-b-2':
                            pathname.toLowerCase() === link.href.toLowerCase(),
                    })}
                >
                    {link.caption}
                </Link>
            ))}
        </nav>
    )
}
