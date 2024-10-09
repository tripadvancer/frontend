import { ReactNode } from 'react'

import Link from 'next/link'

import { ExternalLinkIcon10 } from './icons'

export const ExternalLink = ({ children, href }: { children: ReactNode; href: string }) => {
    return (
        <Link href={href} target="_blank" className="inline-flex items-center gap-x-0.5">
            {children}
            <ExternalLinkIcon10 />
        </Link>
    )
}
