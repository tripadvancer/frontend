import type { StatusResponse, TokenInputs } from '@/utils/types/auth'

export async function restoreAccount(token: TokenInputs): Promise<StatusResponse> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/restore'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function confirmRemoval(token: TokenInputs): Promise<StatusResponse> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/confirm-removal'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
