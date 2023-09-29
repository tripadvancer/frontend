import { notFound } from 'next/navigation'

import { IPlace } from '@/utils/interfaces'

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

export async function getPlacesNearby(placeId: string) {
    const url = process.env.API_URL + '/places/' + placeId + '/nearby'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
