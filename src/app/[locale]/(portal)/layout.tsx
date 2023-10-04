import { TheFooter } from '@/components/TheFooter'
import { TheHeader } from '@/components/TheHeader'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <TheHeader />
            <main className="relative z-0 flex-1">{children}</main>
            <TheFooter />
        </div>
    )
}
