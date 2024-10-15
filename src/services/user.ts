import { cookies } from 'next/headers'

import type { IUserInfo, IUserSettings } from '@/utils/types/user'

export async function getUserInfo(): Promise<IUserInfo> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/user'
    const accessToken = cookies().get('sAccessToken')?.value

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
    const url = process.env.NEXT_PUBLIC_API_URL + '/user/settings'
    const accessToken = cookies().get('sAccessToken')?.value

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
