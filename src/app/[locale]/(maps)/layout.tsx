import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Maps',
    description:
        'Convenient search for places on the map, managing favorite spots, as well as finding a random location for an unforgettable journey.',
    alternates: {
        canonical: '/maps',
    },
}

export default function MapsLayout({ children }: { children: React.ReactNode }) {
    return children
}
