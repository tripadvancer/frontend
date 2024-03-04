import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Maps',
}

export default function MapsLayout({ children }: { children: React.ReactNode }) {
    return children
}
