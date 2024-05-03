import { ISettings } from '@/utils/types/settings'

export async function getSettings(): Promise<ISettings> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/settings'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
