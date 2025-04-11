import { ReactNode } from 'react'

import { CookieConsent } from '@/components/features/banners/cookie-consent/cookie-consent'
import { EmailVerificationWithAuth } from '@/components/features/banners/email-verification/email-verification-with-auth'
import { Footer } from '@/components/features/layout/footer/footer'
import { Header } from '@/components/features/layout/header/header'

export default function PortalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <EmailVerificationWithAuth />
            <Header />
            <main className="flex-1 bg-white">{children}</main>
            <Footer />
            <CookieConsent />
        </div>
    )
}
