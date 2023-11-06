'use client'

import classNames from 'classnames'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { getCurrentUser } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'

type PageSwitcherProps = {
    nav: {
        href: string
        caption: string
        isAuthOnly?: boolean
    }[]
    activeUserId?: number
    className?: string
}

export const PageSwitcher = ({ nav, className, activeUserId }: PageSwitcherProps) => {
    const pathname = usePathname()
    const user = useAppSelector(getCurrentUser)

    return (
        <nav className={classNames('flex gap-x-4 text-big-bold', className)}>
            {nav.map(item => {
                if (item.isAuthOnly && activeUserId !== user?.id) {
                    return null
                }

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={classNames('whitespace-nowrap', {
                            'border-b-2 border-black-100 text-black-100 hover:text-black-100': pathname === item.href,
                            'text-blue-100': pathname !== item.href,
                        })}
                    >
                        {item.caption}
                    </Link>
                )
            })}
        </nav>
    )
}
