import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import type { IUser, IUserVisitedCountries } from '@/utils/types/user'

export async function getUserById(userId: string): Promise<IUser> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/users/' + userId
    const res = await fetch(url, { cache: 'no-cache' })

    if (!res.ok) {
        if (res.status === 404) {
            notFound()
        }

        throw new Error(res.statusText)
    }

    return res.json()
}

export async function getUserVisitedCountries(userId: string): Promise<IUserVisitedCountries> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/users/' + userId + '/visited-countries'
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
