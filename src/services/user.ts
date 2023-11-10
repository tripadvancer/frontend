import type { IUserInfo, UpdateUserProfileInputs } from '@/utils/types/user'

export async function getUserInfo(accessToken: string): Promise<IUserInfo> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user'
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function updateUserInfo({ name, info }: UpdateUserProfileInputs): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user'
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, info }),
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
}

export async function updateUserAvatar(file: File): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user/avatar'
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch(url, {
        method: 'PATCH',
        body: formData,
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
}
