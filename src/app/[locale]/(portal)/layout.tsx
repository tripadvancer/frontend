import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { Footer } from '@/components/features/footer/footer'
import { Header } from '@/components/features/header/header'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 overflow-hidden rounded-t-4xl bg-white">{children}</main>
            <Footer />
            <CookieConsent />
        </div>
    )
}
