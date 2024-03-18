import type { Metadata } from 'next/types'

import { ThirdPartyCallback } from '@/components/features/auth/third-party-callback'

export const metadata: Metadata = {
    title: 'Facebook Authentication',
    alternates: {
        canonical: 'auth/callback/facebook',
    },
}

export default async function FacebookCallbackPage() {
    return <ThirdPartyCallback />
}
