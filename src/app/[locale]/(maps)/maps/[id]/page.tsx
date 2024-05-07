import type { Metadata } from 'next/types'

import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { WidgetUser } from '@/components/features/widget/widget-user'

export const metadata: Metadata = {
    title: 'Maps',
    description: '',
    alternates: {
        canonical: '',
    },
    openGraph: {
        title: 'Maps',
        description: '',
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
        description: '',
        images: '/images/og-image-2.jpg',
    },
}

export default function UserMapsPage() {
    return (
        <div className="h-dvh w-dvw">
            <WidgetUser />
            <CookieConsent />
        </div>
    )
}
