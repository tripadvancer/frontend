'use client'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavProps = {
    links: {
        href: string
        caption: string
    }[]
}

export const Nav = ({ links }: NavProps) => {
    const pathname = usePathname()

    return (
        <nav className="mb-8 flex gap-x-4 text-big-bold">
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
