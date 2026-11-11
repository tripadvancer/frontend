import { ReactNode } from 'react'

export default function LegalLayout({ children }: { children: ReactNode }) {
    return <div className="container py-24">{children}</div>
}
