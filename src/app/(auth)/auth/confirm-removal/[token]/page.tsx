import type { Metadata } from 'next/types'

export const runtime = 'edge'

export const metadata: Metadata = {
    title: 'Confirm Account Removal | Tripadvancer',
    description: '',
}

export default function ConfirmAccountRemoval({ params }: { params: { token: string } }) {
    return <div>Confirm Account Removal, token: {params.token}</div>
}
