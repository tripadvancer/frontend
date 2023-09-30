import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Restore Account | Tripadvancer',
    description: '',
}

export default function RestoreAccount({ params }: { params: { token: string } }) {
    return <div>Restore Account, token: {params.token}</div>
}
