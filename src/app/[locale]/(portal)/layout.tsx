import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 px-8 phone:px-4 bg-white -my-8 rounded-t-4xl">{children}</main>
            <Footer />
        </div>
    )
}
