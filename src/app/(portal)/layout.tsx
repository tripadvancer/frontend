import type { Metadata } from 'next/types'

import { TheFooter } from '@/components/TheFooter'
import { TheHeader } from '@/components/TheHeader'

export const metadata: Metadata = {
    title: 'Tripadvancer - Plan your trip and find interesting places',
    description: 'Tripadvancer will help you discover the world in a new way, find interesting places and go to an amazing trip.',
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <TheHeader />
            <main className="relative z-0 flex-1">{children}</main>
            <TheFooter />
        </div>
    )
}
