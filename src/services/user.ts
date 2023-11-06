import type { IUserInfo, IUserProfile } from '@/types/user'

export async function getUserInfo(): Promise<IUserInfo> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getUserProfile(accessToken: string): Promise<IUserProfile> {
    'server only'
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
