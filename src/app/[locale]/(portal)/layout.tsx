import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header/Header'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="-my-8 flex-1 overflow-hidden rounded-t-4xl bg-white">{children}</main>
            <Footer />
        </div>
    )
}
