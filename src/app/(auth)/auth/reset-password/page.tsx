import { Metadata } from 'next/types'

import { RessetPassword } from '@/components/features/auth/resset-password'

export const metadata: Metadata = {
    title: 'Resset Password',
    alternates: {
        canonical: 'auth/resset-password',
    },
}

export default async function RessetPasswordPage() {
    return <RessetPassword />
}
