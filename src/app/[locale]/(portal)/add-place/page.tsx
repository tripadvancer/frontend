import type { Metadata } from 'next/types'

import { PlaceAdd } from '@/components/features/place-form/place-add'
import { ProtectClientRoute } from '@/components/ui/protect-client-route'

export const metadata: Metadata = {
    title: 'Add Place',
    robots: 'noindex, nofollow',
    alternates: {
        canonical: '/add-place',
    },
}

export default function AddPlacePage() {
    return (
        <ProtectClientRoute>
            <PlaceAdd />
        </ProtectClientRoute>
    )
}
