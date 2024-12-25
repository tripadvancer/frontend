import { ReactNode } from 'react'

import { ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'

type ExternalLinkProps = {
    children: ReactNode
    href: string
}

export const ExternalLink = ({ children, href }: ExternalLinkProps) => {
    return (
        <Link href={href} target="_blank" className="inline-flex items-center justify-center gap-x-0.5">
            {children}

            <ExternalLinkIcon size={12} strokeWidth={2.75} />
        </Link>
    )
}
