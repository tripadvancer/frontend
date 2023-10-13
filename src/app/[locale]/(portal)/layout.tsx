import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header/Header'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="-my-8 flex-1 rounded-t-4xl bg-white px-8 phone:px-4">{children}</main>
            <Footer />
        </div>
    )
}
