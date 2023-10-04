import { currentLocale } from 'next-i18n-router'

import { Roboto } from 'next/font/google'

import './globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = currentLocale()

    return (
        <html lang={locale}>
            <body className={roboto.className}>{children}</body>
        </html>
    )
}
