import { IPlace } from '@/utils/interfaces'

export async function getPlaceById(id: string): Promise<IPlace> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places/' + id
    const res = await fetch(url)

    if (!res.ok) {
        if (res.status === 404) {
            throw new Error('Place not found')
        }

        throw new Error('Failed to fetch data')
    }

    return res.json()
}
