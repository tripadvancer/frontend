import type { Metadata } from 'next/types'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Maps',
    }
}

export default function MapsLayout({ children }: { children: React.ReactNode }) {
    return children
}
