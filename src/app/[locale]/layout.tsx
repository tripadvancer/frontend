import { currentLocale } from 'next-i18n-router'

import { Roboto } from 'next/font/google'

import i18nConfig from '@/configs/i18n.config'

import '../globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export const runtime = 'edge'

export function generateStaticParams() {
    return i18nConfig.locales.map(locale => ({ locale }))
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = currentLocale()

    return (
        <html lang={locale}>
            <body className={roboto.className}>{children}</body>
        </html>
    )
}
