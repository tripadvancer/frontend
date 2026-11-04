import { Metadata } from 'next/types'

import { Feed } from '@/components/features/pages/feed/feed'

export const metadata: Metadata = {
    title: 'Feed',
    description: 'Discover the latest places shared by travelers around the world.',
    alternates: {
        canonical: '/feed',
    },
}

export default function FeedPage() {
    return <Feed />
}
