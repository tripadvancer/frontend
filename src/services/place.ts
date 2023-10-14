import { notFound } from 'next/navigation'

import type { IPlace } from '@/types/place'

export async function getPlacesByCountryCode(countryCode: string): Promise<IPlace[]> {
    const url = process.env.API_URL + '/countries/' + countryCode + '/places'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getPlaceById(placeId: string): Promise<IPlace> {
    const url = process.env.API_URL + '/places/' + placeId
    const res = await fetch(url)

    if (!res.ok) {
        if (res.status === 404) {
            notFound()
        }

        throw new Error('Failed to fetch data')
    }

    return res.json()
}
