import { ReactNode } from 'react'

import Link from 'next/link'

type ShowAllLinkProps = {
    href: string
    children: ReactNode
}

export const ShowAllLink = ({ href, children }: ShowAllLinkProps) => {
    return (
        <Link
            href={href}
            className="flex-center hover-animated border-blue-20 hover:border-blue-active hover:text-blue-active h-10 rounded-full border px-6 font-medium text-blue-100"
        >
            {children}
        </Link>
    )
}
