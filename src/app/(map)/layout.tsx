import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Tripadvancer - Plan your trip and find interesting places',
    description: 'Tripadvancer will help you discover the world in a new way, find interesting places and go to an amazing trip.',
}

export default function MapLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
}
