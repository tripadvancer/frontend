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

export const Nav = async ({ links, className }: NavProps) => {
    const pathname = usePathname()

    return (
        <nav className={classNames('flex gap-x-4 text-big-bold', className)}>
            {links.map(link => {
                // с учетом локализации, например в en локализации path выглядит следующим образом /users/1, а в ru локализации ru/users/1
                // http://localhost:3000/users/1 and http://localhost:3000/ru/users/1
                // http://localhost:3000/users/1/reviews and http://localhost:3000/ru/users/1/reviews
                // http://localhost:3000/users/1/settings and http://localhost:3000/ru/users/1/settings
                const isActive = pathname.includes(link.href)
                // const isActive = pathname.includes(link.href)
                // const isActive = pathname.startsWith(link.href)
                // const isActive = pathname === link.href

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={classNames('whitespace-nowrap', {
                            'border-b-2 border-black-100 text-black-100 hover:text-black-100': isActive,
                        })}
                    >
                        {link.caption}
                    </Link>
                )
            })}
        </nav>
    )
}
