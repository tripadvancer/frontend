import { ReactNode } from 'react'

import classNames from 'classnames'

import Link from 'next/link'

type LinkButtonProps = {
    href: string
    children: ReactNode
    variant?: 'blue' | 'white'
    className?: string
}

export const LinkButton = ({ href, children, variant = 'blue', className }: LinkButtonProps) => {
    return (
        <Link
            href={href}
            className={classNames(
                'hover-animated inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg px-6 font-medium focus:outline-none',
                { 'bg-blue-100 text-white hover:bg-blue-active hover:text-white': variant === 'blue' },
                { 'border border-white text-white hover:text-white': variant === 'white' },
                className,
            )}
        >
            {children}
        </Link>
    )
}
