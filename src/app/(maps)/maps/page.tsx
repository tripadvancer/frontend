import { Metadata } from 'next/types'

import { CookieConsent } from '@/components/features/banners/cookie-consent/cookie-consent'
import { MapWithAuth } from '@/components/features/maps/map/map-with-auth'
import { MapsLayout } from '@/components/features/maps/maps-layout/maps-layout'
import { WidgetHeader } from '@/components/features/maps/widget/components/widget-header/widget-header'
import { WidgetPlaces } from '@/components/features/maps/widget/widget-places'
import { WidgetRandomPlace } from '@/components/features/maps/widget/widget-random-place'

export const metadata: Metadata = {
    title: 'Travel Map: Find Attractions and Hidden Gems',
    description:
        'Explore traveler-recommended attractions and hidden gems on an interactive travel map. Find places nearby, save favorites, and discover where to go next.',
    alternates: {
        canonical: '/maps',
    },
    openGraph: {
        title: 'Travel Map: Find Attractions and Hidden Gems',
        description:
            'Explore traveler-recommended attractions and hidden gems on an interactive travel map. Find places nearby, save favorites, and discover where to go next.',
        url: '/maps',
        images: [
            {
                url: '/open-graph/image-2.jpg',
                width: 1200,
                height: 628,
                type: 'image/jpeg',
                alt: 'Tripadvancer',
            },
        ],
    },
    twitter: {
        title: 'Travel Map: Find Attractions and Hidden Gems',
        description:
            'Explore traveler-recommended attractions and hidden gems on an interactive travel map. Find places nearby, save favorites, and discover where to go next.',
        images: '/open-graph/image-2.jpg',
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
