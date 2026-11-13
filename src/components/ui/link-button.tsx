import { ReactNode } from 'react'

import classNames from 'classnames'

import Link from 'next/link'

type LinkButtonProps = {
    href: string
    children: ReactNode
    variant?: 'blue' | 'white' | 'orange'
    className?: string
}

export const LinkButton = ({ href, children, variant = 'blue', className }: LinkButtonProps) => {
    return (
        <Link
            href={href}
            className={classNames(
                'hover-animated inline-flex h-10 items-center justify-center rounded-lg px-6 font-medium whitespace-nowrap focus:outline-none',
                { 'hover:bg-blue-active bg-blue-100 text-white hover:text-white': variant === 'blue' },
                { 'border border-white text-white hover:text-white': variant === 'white' },
                { 'hover:bg-orange-active bg-orange-100 text-white hover:text-white': variant === 'orange' },
                className,
            )}
        >
            {children}
        </Link>
    )
}
