import { Roboto } from 'next/font/google'
import type { Metadata, Viewport } from 'next/types'

import { TailwindIndicator } from '@/components/ui/tailwind-indicator'

import '../globals.css'
import 'react-indiana-drag-scroll/dist/style.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { Providers } from './providers'

export const runtime = 'edge'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string),
    alternates: {
        canonical: '/',
    },
    title: {
        template: '%s | Tripadvancer',
        default: 'Tripadvancer - Plan your trip and find interesting places',
    },
    description:
        'Tripadvancer will help you discover the world in a new way, find interesting places and go to an amazing trip.',
    openGraph: {
        title: {
            template: '%s | Tripadvancer',
            default: 'Welcome to Tripadvancer',
        },
        type: 'website',
        locale: 'en',
        url: '/',
        siteName: 'Tripadvancer',
        images: [
            {
                url: '/images/og-image-1.jpg',
                width: 1200,
                height: 628,
                type: 'image/jpeg',
                alt: 'Tripadvancer',
            },
        ],
    },
    twitter: {
        title: {
            template: '%s | Tripadvancer',
            default: 'Welcome to Tripadvancer',
        },
        card: 'summary_large_image',
        images: '/images/og-image-1.jpg',
    },
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    const locale = params.locale

    return (
        <html lang={locale}>
            <head>
                <link href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css" rel="stylesheet" />
            </head>
            <body className={roboto.className}>
                <Providers locale={locale}>{children}</Providers>
                <TailwindIndicator />
            </body>
        </html>
    )
}
