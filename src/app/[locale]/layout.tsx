import { setStaticParamsLocale } from 'next-international/server'

import { Roboto } from 'next/font/google'
import type { Metadata } from 'next/types'

import { DialogProvider } from '@/providers/DialogProvider'
import { I18nProvider } from '@/providers/I18nProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import { ReduxProvider } from '@/redux/provider'
import { getScopedI18n } from '@/utils/i18n.server'

import '../globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export const runtime = 'edge'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getScopedI18n('common.meta')

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = params.locale
    setStaticParamsLocale(locale)

    return (
        <html lang={locale}>
            <body className={roboto.className}>
                <ReduxProvider>
                    <I18nProvider locale={locale}>
                        <ToastProvider>
                            <DialogProvider>{children}</DialogProvider>
                        </ToastProvider>
                    </I18nProvider>
                </ReduxProvider>
            </body>
        </html>
    )
}
