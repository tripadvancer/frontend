import { ReactNode } from 'react'

import classNames from 'classnames'

import Link from 'next/link'

type BlogNavLinkProps = {
    href: string
    children: ReactNode
    isCurrent: boolean
}

export const BlogNavLink = ({ href, children, isCurrent }: BlogNavLinkProps) => {
    return (
        <Link
            href={href}
            scroll={false}
            replace={true}
            className={classNames(
                'flex-center hover-animated h-8 cursor-pointer whitespace-nowrap rounded-full bg-blue-20 px-4 text-small text-blue-100 hover:bg-blue-active hover:text-blue-20',
                {
                    'bg-blue-active text-blue-20': isCurrent,
                },
            )}
        >
            {children}
        </Link>
    )
}
