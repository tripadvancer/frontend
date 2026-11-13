import { ReactNode } from 'react'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'
import { Metadata, Viewport } from 'next/types'

import { JsonLd } from '@/components/features/common/json-ld'
import YandexMetrika from '@/components/features/common/yandex-metrika'
import { TailwindIndicator } from '@/components/ui/tailwind-indicator'

import './globals.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { Providers } from './providers'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string),
    alternates: {
        canonical: '/',
    },
    title: {
        template: '%s | Tripadvancer',
        default: 'Discover Hidden Gems & Plan Your Trip | Tripadvancer',
    },
    description:
        "Explore traveler-recommended attractions and hidden gems on an interactive map. Save places to trip lists, read reviews, and track the countries you've visited.",
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
            default: 'Discover Hidden Gems & Plan Your Trip | Tripadvancer',
        },
        type: 'website',
        locale: 'en_US',
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
            default: 'Discover Hidden Gems & Plan Your Trip | Tripadvancer',
        },
        card: 'summary_large_image',
        images: '/open-graph/image-1.jpg',
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="yandex-verification" content="b588c94393b01e7f" />
                <link rel="apple-touch-icon" href="/icons/icon-192.png" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </head>
            <body className={roboto.className}>
                <JsonLd
                    data={[
                        {
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            '@id': `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/#organization`,
                            name: 'Tripadvancer',
                            url: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
                            logo: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/images/logo.svg`,
                            description:
                                'A travel community for discovering places, planning trips, and sharing recommendations.',
                            sameAs: ['https://twitter.com/tripadvancer_me'],
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            '@id': `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/#website`,
                            name: 'Tripadvancer',
                            url: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
                            publisher: {
                                '@id': `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/#organization`,
                            },
                        },
                    ]}
                />
                <Providers>{children}</Providers>
                <YandexMetrika />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
                <TailwindIndicator />
            </body>
        </html>
    )
}
