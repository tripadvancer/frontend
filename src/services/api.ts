import 'server-only'

import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

type ApiFetchOptions = RequestInit & {
    // Forwards the SuperTokens access token. The session is verified by withAuth before these requests.
    withSession?: boolean
    notFoundOn404?: boolean
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
    const { withSession, notFoundOn404, ...init } = options
    const headers = withSession ? await getSessionHeaders() : undefined
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, { ...init, headers })

    if (!res.ok) {
        if (notFoundOn404 && res.status === 404) {
            notFound()
        }

        throw new Error(res.statusText)
    }

    return res.json()
}

async function getSessionHeaders(): Promise<HeadersInit> {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('sAccessToken')?.value

    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
}
