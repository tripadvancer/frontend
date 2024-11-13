import { Metadata } from 'next/types'

import { ResetPassword } from '@/components/features/auth/reset-password'

export const metadata: Metadata = {
    title: 'Reset Password',
    alternates: {
        canonical: 'auth/reset-password',
    },
}

export default async function ResetPasswordPage() {
    return <ResetPassword />
}
