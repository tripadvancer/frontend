import { Countries } from '@/components/features/pages/countries/countries'

export const metadata = {
    title: 'Travel Destinations and Places to Visit Around the World',
    description:
        'Explore destinations around the world and find traveler-recommended attractions, scenic places, and things to do for your next trip.',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Travel Destinations and Places to Visit Around the World',
        description:
            'Explore destinations around the world and find traveler-recommended attractions, scenic places, and things to do for your next trip.',
        url: '/',
    },
}

export default function HomePage() {
    return <Countries />
}
