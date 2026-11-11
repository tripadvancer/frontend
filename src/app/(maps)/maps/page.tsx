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

type MapsPageProps = {
    searchParams: Promise<{ bounds?: string | string[] }>
}

export default async function MapsPage({ searchParams }: MapsPageProps) {
    const boundsParam = (await searchParams).bounds
    const boundsValues = typeof boundsParam === 'string' ? boundsParam.split(',').map(Number) : []
    const initialBounds =
        boundsValues.length === 4 &&
        boundsValues.every(Number.isFinite) &&
        boundsValues[1] >= -90 &&
        boundsValues[1] <= 90 &&
        boundsValues[3] >= -90 &&
        boundsValues[3] <= 90
            ? (boundsValues as [number, number, number, number])
            : undefined

    return (
        <div className="h-dvh w-dvw">
            <MapsLayout
                map={<MapWithAuth initialBounds={initialBounds} />}
                header={<WidgetHeader />}
                widget={<WidgetPlaces />}
                widgetRandom={<WidgetRandomPlace />}
            />
            <CookieConsent />
        </div>
    )
}
