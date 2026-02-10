import { ReactNode } from 'react'

import Link from 'next/link'

type HeaderMobileMenuLinkProps = {
    children: ReactNode
    href: string
    scroll: boolean
    closeMobileMenu: () => void
}

export const HeaderMobileMenuLink = ({ children, href, scroll, closeMobileMenu }: HeaderMobileMenuLinkProps) => {
    return (
        <Link
            href={href}
            className="flex items-center justify-between gap-x-2"
            scroll={scroll}
            onClick={closeMobileMenu}
        >
            {children}
        </Link>
    )
}
