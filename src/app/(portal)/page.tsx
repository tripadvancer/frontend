import { Landing } from '@/components/features/pages/landing/landing'

export const metadata = {
    title: 'Discover Hidden Gems and Plan Your Trip',
    description:
        "Explore traveler-recommended attractions and hidden gems on an interactive map. Save places to trip lists, read reviews, and track the countries you've visited.",
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Discover Hidden Gems and Plan Your Trip',
        description:
            "Explore traveler-recommended attractions and hidden gems on an interactive map. Save places to trip lists, read reviews, and track the countries you've visited.",
        url: '/',
    },
}

export default async function HomePage() {
    return <Landing />
}
