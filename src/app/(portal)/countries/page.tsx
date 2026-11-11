import { Countries } from '@/components/features/pages/countries/countries'

export const metadata = {
    title: 'Travel Destinations and Places to Visit Around the World',
    description:
        'Explore destinations around the world and find traveler-recommended attractions, scenic places, and things to do for your next trip.',
    alternates: {
        canonical: '/countries',
    },
    openGraph: {
        title: 'Travel Destinations and Places to Visit Around the World',
        description:
            'Explore destinations around the world and find traveler-recommended attractions, scenic places, and things to do for your next trip.',
        url: '/countries',
    },
}

export default function CountriesPage() {
    return <Countries />
}
