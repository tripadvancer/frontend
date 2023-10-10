import { Roboto } from 'next/font/google'

import { i18nConfig } from '@/configs/i18n.config'
import { DialogProvider } from '@/providers/DialogProvider'
import { I18nProvider } from '@/providers/I18nProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import { ReduxProvider } from '@/redux/provider'
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
                <ReduxProvider>
                    <I18nProvider>
                        <DialogProvider>
                            <ToastProvider>{children}</ToastProvider>
                        </DialogProvider>
                    </I18nProvider>
                </ReduxProvider>
            </body>
        </html>
    )
}
