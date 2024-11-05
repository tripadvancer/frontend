import { Metadata } from 'next/types'

import { VerifyEmail } from '@/components/features/auth/verify-email'

export const metadata: Metadata = {
    title: 'Verify Email',
    alternates: {
        canonical: 'auth/verify-email',
    },
}

export default async function VerifyEmailPage() {
    return <VerifyEmail />
}
