import 'server-only'

import { ApplicationSettings } from '@/utils/redux/services/settings/settings.types'

export async function getApplicationSettings(): Promise<ApplicationSettings> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/settings`
    const res = await fetch(url, { next: { revalidate: 60 } })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
