import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Maps',
    description:
        'Convenient search for places on the map, managing favorite spots, as well as finding a random location for an unforgettable journey.',
    alternates: {
        canonical: '/maps',
    },
    openGraph: {
        title: 'Maps',
        description:
            'Convenient search for places on the map, managing favorite spots, as well as finding a random location for an unforgettable journey.',
        url: '/maps',
        images: [
            {
                url: '/images/og-image-2.jpg',
                width: 1200,
                height: 628,
                type: 'image/jpeg',
                alt: 'Tripadvancer',
            },
        ],
    },
    twitter: {
        title: 'Maps',
        description:
            'Convenient search for places on the map, managing favorite spots, as well as finding a random location for an unforgettable journey.',
        images: '/images/og-image-2.jpg',
    },
}

export default function MapsLayout({ children }: { children: React.ReactNode }) {
    return children
}
