import { ReactNode } from 'react'

import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Maps',
}

export default function MapsLayout({ children }: { children: ReactNode }) {
    return children
}
