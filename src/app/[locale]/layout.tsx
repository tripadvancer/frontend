import { Roboto } from 'next/font/google'

import { i18nConfig } from '@/configs/i18n.config'
import { DialogProvider } from '@/providers/dialog-provider'
import { I18nProvider } from '@/providers/i18n-provider'
import { getCurrentLocale } from '@/utils/i18n.server'

import '../globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export const runtime = 'edge'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const local = getCurrentLocale() ?? i18nConfig.defaultLocale

    return (
        <html lang={local}>
            <body className={roboto.className}>
                <I18nProvider>
                    <DialogProvider>{children}</DialogProvider>
                </I18nProvider>
            </body>
        </html>
    )
}
