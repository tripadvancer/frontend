import type { Metadata } from 'next/types'

import { ThirdPartyCallback } from '@/components/features/auth/third-party-callback'

export const metadata: Metadata = {
    title: 'Google Authentication',
    alternates: {
        canonical: 'auth/callback/google',
    },
}

export default async function GoogleCallbackPage() {
    return <ThirdPartyCallback />
}
