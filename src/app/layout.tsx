import { ReactNode } from 'react'

import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'
import { Metadata, Viewport } from 'next/types'

import { TailwindIndicator } from '@/components/ui/tailwind-indicator'

import './globals.css'
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
        default: 'Tripadvancer - Share your favorite spots and track visited countries',
    },
    description:
        'Join the community of travelers and share your favorite places with others. Track the countries you have visited and plan your next trip.',
    appleWebApp: {
        title: 'Tripadvancer',
        startupImage: [
            {
                url: '/apple-web-app/iphone5_splash.png',
                media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
            },
            {
                url: '/apple-web-app/iphone6_splash.png',
                media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
            },
            {
                url: '/apple-web-app/iphoneplus_splash.png',
                media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
            },
            {
                url: '/apple-web-app/iphonex_splash.png',
                media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
            },
            {
                url: '/apple-web-app/iphonexr_splash.png',
                media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
            },
            {
                url: '/apple-web-app/iphonexsmax_splash.png',
                media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
            },
            {
                url: '/apple-web-app/ipad_splash.png',
                media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
            },
            {
                url: '/apple-web-app/ipadpro1_splash.png',
                media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
            },
            {
                url: '/apple-web-app/ipadpro3_splash.png',
                media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
            },
            {
                url: '/apple-web-app/ipadpro2_splash.png',
                media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
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

export default async function RootLayout({ children }: { children: ReactNode }) {
    const locale = await getLocale()
    const messages = await getMessages()

    return (
        <html lang={locale}>
            <head>
                <link href="https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css" rel="stylesheet" />
            </head>
            <body className={roboto.className}>
                <NextIntlClientProvider messages={messages}>
                    <Providers>{children}</Providers>
                </NextIntlClientProvider>

                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
                <TailwindIndicator />
            </body>
        </html>
    )
}
