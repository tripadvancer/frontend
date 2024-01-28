import { notFound } from 'next/navigation'

import type { IUser } from '@/utils/types/user'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function getUserById(userId: string): Promise<IUser> {
    const url = apiUrl + '/users/' + userId
    const res = await fetch(url)

    if (!res.ok) {
        if (res.status === 404) {
            notFound()
        }

        throw new Error(res.statusText)
    }

    return res.json()
}
