import { Roboto } from 'next/font/google'
import type { Metadata } from 'next/types'

import { TailwindIndicator } from '@/components/tailwind-indicator'
import { AuthProviders } from '@/providers/auth-provider'
import { DialogProvider } from '@/providers/dialog-provider'
import { I18nProvider } from '@/providers/i18n-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ReduxProvider } from '@/redux/provider'

import '../globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string),
    alternates: {
        canonical: '/',
    },
    title: {
        template: '%s | Tripadvancer',
        default: 'Tripadvancer - Plan your trip and find interesting places',
    },
    description: 'Tripadvancer will help you discover the world in a new way, find interesting places and go to an amazing trip.',
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
            <body className={roboto.className}>
                <ReduxProvider>
                    <I18nProvider locale={locale}>
                        <AuthProviders>
                            <ToastProvider>
                                <DialogProvider>{children}</DialogProvider>
                            </ToastProvider>
                        </AuthProviders>
                    </I18nProvider>
                </ReduxProvider>
                <TailwindIndicator />
            </body>
        </html>
    )
}
