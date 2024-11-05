import { Metadata } from 'next/types'

import { CookieConsent } from '@/components/features/banners/cookie-consent/cookie-consent'
import { MapWithAuth } from '@/components/features/maps/map/map-with-auth'
import { MapsLayout } from '@/components/features/maps/maps-layout/maps-layout'
import { WidgetHeader } from '@/components/features/maps/widget/components/widget-header/widget-header'
import { WidgetPlaces } from '@/components/features/maps/widget/widget-places'
import { WidgetRandomPlace } from '@/components/features/maps/widget/widget-random-place'

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
            <MapsLayout
                map={<MapWithAuth />}
                header={<WidgetHeader />}
                widget={<WidgetPlaces />}
                widgetRandom={<WidgetRandomPlace />}
            />
            <CookieConsent />
        </div>
    )
}
