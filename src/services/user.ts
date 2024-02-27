import type {
    ChangeUserEmailInputs,
    ChangeUserEmailResponse,
    ChangeUserPasswordInputs,
    ChangeUserPasswordResponse,
    ConfirmUserDeletionResponse,
    RestoreUserResponse,
} from '@/utils/types/user'

export async function changeUserPassword(body: ChangeUserPasswordInputs): Promise<ChangeUserPasswordResponse> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user/password'
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function changeUserEmail(body: ChangeUserEmailInputs): Promise<ChangeUserEmailResponse> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user/email'
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function requestPersonalData(): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user/personal-data'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function requestUserDeletion(): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user'
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function confirmUserDeletion(token: string): Promise<ConfirmUserDeletionResponse> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user/confirm-deletion'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function restoreUser(token: string): Promise<RestoreUserResponse> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user/restore'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
