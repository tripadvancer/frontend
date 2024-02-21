import classNames from 'classnames'

import Link from 'next/link'

type LinkButtonProps = {
    href: string
    children: React.ReactNode
    className?: string
}

export const LinkButton = ({ href, children, className }: LinkButtonProps) => {
    return (
        <Link
            href={href}
            className={classNames(
                'hover-animated inline-flex h-10 items-center justify-center rounded-lg bg-blue-100 px-6 font-medium text-white hover:bg-blue-active hover:text-white focus:outline-none',
                className,
            )}
        >
            {children}
        </Link>
    )
}
