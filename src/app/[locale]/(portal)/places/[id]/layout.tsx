import type { Metadata } from 'next/types'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: 'asasas',
    }
}

export default function PlaceLayout({ children }: { children: React.ReactNode }) {
    return children
}
