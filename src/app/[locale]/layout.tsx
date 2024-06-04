import { ReactNode } from 'react'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'
import type { Metadata, Viewport } from 'next/types'

import { TailwindIndicator } from '@/components/ui/tailwind-indicator'

import '../globals.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { Providers } from './providers'

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
    appleWebApp: {
        title: 'Tripadvancer',
        startupImage: [
            '/apple-web-app/apple-touch-startup-image-768x1004.png',
            {
                url: '/apple-web-app/apple-touch-startup-image-1536x2008.png',
                media: '(device-width: 768px) and (device-height: 1024px)',
            },
        ],
    },
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
                url: '/open-graph/image-1.jpg',
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
        images: '/open-graph/image-1.jpg',
    },
}

export default async function RootLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
    const locale = params.locale

    return (
        <html lang={locale}>
            <head>
                <link href="https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css" rel="stylesheet" />
            </head>
            <body className={roboto.className}>
                <Providers locale={locale}>{children}</Providers>
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MENSUREMENT_ID as string} />
                <TailwindIndicator />
            </body>
        </html>
    )
}
