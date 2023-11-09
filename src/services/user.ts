import type { IUserProfile } from '@/utils/types/user'

export async function getUserInfo(accessToken: string): Promise<IUserProfile> {
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
