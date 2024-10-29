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
            className="flex-center hover-animated h-10 rounded-full border border-blue-20 px-6 font-medium text-blue-100 hover:border-blue-active hover:text-blue-active"
        >
            {children}
        </Link>
    )
}
