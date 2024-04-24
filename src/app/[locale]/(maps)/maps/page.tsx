import type { Metadata } from 'next/types'

import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { MapWithAuth } from '@/components/features/map/map-with-auth'
import { Onboarding } from '@/components/features/onboarding/onboarding'
import { WidgetCommon } from '@/components/features/widget/widget-common'

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

export default function MapsPage() {
    return (
        <div className="h-dvh w-dvw">
            <WidgetCommon />
            <MapWithAuth />
            <Onboarding />
            <CookieConsent />
        </div>
    )
}
