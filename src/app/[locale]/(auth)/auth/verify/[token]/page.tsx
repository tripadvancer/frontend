import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Verify Email | Tripadvancer',
    description: '',
}

export default function VerifyEmail({ params }: { params: { token: string } }) {
    return <div>Verify Email, token: {params.token}</div>
}
