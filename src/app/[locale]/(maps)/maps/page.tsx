import type { Metadata } from 'next/types'

import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { MapWithAuth } from '@/components/features/map/map-with-auth'
import { MapsContainer } from '@/components/features/maps-container/maps-container'
import { WidgetHeader } from '@/components/features/widget/components/widget-header/widget-header'
import { Widget } from '@/components/features/widget/widget'
import { WidgetRandomPlace } from '@/components/features/widget/widget-random-place'

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
            <MapsContainer
                map={<MapWithAuth />}
                header={<WidgetHeader />}
                widget={<Widget />}
                widgetRandom={<WidgetRandomPlace />}
            />
            <CookieConsent />
        </div>
    )
}
