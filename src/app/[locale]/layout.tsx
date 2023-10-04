import { Roboto } from 'next/font/google'

import i18nConfig from '@/configs/i18n.config'

import '../globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export function generateStaticParams() {
    return i18nConfig.locales.map(locale => ({ locale }))
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    return (
        <html lang={params.locale}>
            <body className={roboto.className}>{children}</body>
        </html>
    )
}
