import { Roboto } from 'next/font/google'

import { getCurrentLocale } from '@/locales/server'

import '../globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export const runtime = 'edge'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const local = getCurrentLocale() ?? 'en'

    return (
        <html lang={local}>
            <body className={roboto.className}>{children}</body>
        </html>
    )
}
