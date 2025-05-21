import { Metadata } from 'next'

import { About } from '@/components/features/about/about'

export const metadata: Metadata = {
    title: 'About',
    description:
        "Tripadvancer is a travel platform where people share interesting places, keep a personal travel journal, and track countries they've visited. Join a global travel community and start sharing your favorite spots.",
    keywords:
        'travel journal, travel map, hidden gems, travel community, share locations, visited countries, personal travel log',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About',
        description:
            'Discover Tripadvancer — a map of hidden travel spots shared by real travelers. Save your journeys, explore new places, and inspire others with your adventures.',
        url: '/about',
        siteName: 'Tripadvancer',
        images: [
            {
                url: '/images/about.jpg',
                width: 1200,
                height: 630,
                alt: 'About Us — TripAdvancer | Discover & Share Unique Travel Places',
            },
        ],
    },
    twitter: {
        title: 'About',
        description:
            'Discover Tripadvancer — a map of hidden travel spots shared by real travelers. Save your journeys, explore new places, and inspire others with your adventures.',
        images: '/images/about.jpg',
    },
}

export default function AboutPage() {
    return <About />
}
