import { cookies } from 'next/headers'

import type { IUserInfo, IUserSettings } from '@/utils/types/user'

export async function getUserInfo(): Promise<IUserInfo> {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('sAccessToken')?.value
    const url = process.env.NEXT_PUBLIC_API_URL + '/user'

    // todo: handle refresh token
    const res = await fetch(url, {
        cache: 'no-cache',
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function getUserSettings(): Promise<IUserSettings> {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('sAccessToken')?.value
    const url = process.env.NEXT_PUBLIC_API_URL + '/user/settings'

    // todo: handle refresh token
    const res = await fetch(url, {
        cache: 'no-cache',
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
