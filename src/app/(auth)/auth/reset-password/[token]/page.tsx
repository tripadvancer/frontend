import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Resset Password | Tripadvancer',
    description: '',
}

export default function RessetPassword({ params }: { params: { token: string } }) {
    return <div>Reset Password, token: {params.token}</div>
}
