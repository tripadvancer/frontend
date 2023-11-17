import { CookieConsent } from '@/components/cookie-consent'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header/header'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <div className="absolute left-0 right-0 top-0 -z-10 h-[108px] bg-blue-20" />
            <Header />
            <main className="flex-1 overflow-hidden rounded-t-4xl bg-white">{children}</main>
            <Footer />
            <CookieConsent />
        </div>
    )
}
