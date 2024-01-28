import type {
    ChangeUserEmailInputs,
    ChangeUserEmailResponse,
    ChangeUserPasswordInputs,
    ChangeUserPasswordResponse,
    ConfirmUserDeletionResponse,
    IUserInfo,
    RestoreUserResponse,
    UpdateUserInfoInputs,
    UpdateUserInfoResponse,
} from '@/utils/types/user'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function getUserInfo(accessToken: string): Promise<IUserInfo> {
    const url = apiUrl + '/user'
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function updateUserInfo(body: UpdateUserInfoInputs): Promise<UpdateUserInfoResponse> {
    const url = apiUrl + '/user'
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

export async function changeUserPassword(body: ChangeUserPasswordInputs): Promise<ChangeUserPasswordResponse> {
    const url = apiUrl + '/user/password'
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
    const url = apiUrl + '/user/email'
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

export async function updateUserAvatar(file: File): Promise<void> {
    const url = apiUrl + '/user/avatar'
    const formData = new FormData()

    formData.append('file', file)

    const res = await fetch(url, {
        method: 'PATCH',
        body: formData,
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function deleteUserAvatar(): Promise<void> {
    const url = apiUrl + '/user/avatar'
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function requestPersonalData(): Promise<void> {
    const url = apiUrl + '/user/personal-data'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function requestUserDeletion(): Promise<void> {
    const url = apiUrl + '/user'
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function confirmUserDeletion(token: string): Promise<ConfirmUserDeletionResponse> {
    const url = apiUrl + '/user/confirm-deletion'
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
    const url = apiUrl + '/user/restore'
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
