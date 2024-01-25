import { ReactNode } from 'react'

import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { LayoutFooter } from '@/components/features/layout-footer/layout-footer'
import { LayoutHeader } from '@/components/features/layout-header/layout-header'

export default function PortalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <div className="absolute left-0 right-0 top-0 -z-10 h-[108px] bg-blue-20" />
            <LayoutHeader />
            <main className="flex-1 overflow-hidden rounded-t-4xl bg-white">{children}</main>
            <LayoutFooter />
            <CookieConsent />
        </div>
    )
}
