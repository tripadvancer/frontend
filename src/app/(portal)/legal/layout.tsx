import { ReactNode } from 'react'

import { Metadata } from 'next/types'

export const metadata: Metadata = {
    robots: 'noindex, nofollow',
}

export default function LegalLayout({ children }: { children: ReactNode }) {
    return <div className="container py-24">{children}</div>
}
