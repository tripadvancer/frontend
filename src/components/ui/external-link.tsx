import { ReactNode } from 'react'

import Link from 'next/link'

import { ExternalLinkIcon10 } from './icons'

type ExternalLinkProps = {
    children: ReactNode
    href: string
}

export const ExternalLink = ({ children, href }: ExternalLinkProps) => {
    return (
        <Link href={href} target="_blank" className="inline-flex items-center gap-x-0.5">
            {children}
            <ExternalLinkIcon10 />
        </Link>
    )
}
