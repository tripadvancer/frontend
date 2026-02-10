import { ReactNode } from 'react'

import Link from 'next/link'

type HeaderMobileMenuLinkProps = {
    children: ReactNode
    href: string
    closeMobileMenu: () => void
}

export const HeaderMobileMenuLink = ({ children, href, closeMobileMenu }: HeaderMobileMenuLinkProps) => {
    return (
        <Link href={href} className="flex items-center justify-between gap-x-2" onClick={closeMobileMenu}>
            {children}
        </Link>
    )
}
