import type { ICountry } from '@/types/country'

export async function getCountries(): Promise<ICountry[]> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/countries'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
