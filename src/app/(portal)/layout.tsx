import { ReactNode } from 'react'

import { CookieConsent } from '@/components/features/banners/cookie-consent/cookie-consent'
import { Footer } from '@/components/features/layout/footer/footer'
import { Header } from '@/components/features/layout/header/header'

export default function PortalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 overflow-hidden rounded-t-4xl bg-white">{children}</main>
            <Footer />
            <CookieConsent />
        </div>
    )
}
