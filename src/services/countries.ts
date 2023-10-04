import { ICountry } from '@/utils/interfaces'

export async function getCountries(): Promise<ICountry[]> {
    const url = process.env.API_URL + '/countries'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
