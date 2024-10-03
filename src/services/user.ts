import { cookies } from 'next/headers'

import type { IUserSettings } from '@/utils/types/user'

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
