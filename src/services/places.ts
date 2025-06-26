import { notFound } from 'next/navigation'

import { GetPlacesAroundParams, GetPlacesAroundResponse } from '@/redux/services/places-around.types'
import { GetPlaceByIdResponse, GetPlacesByCountryCodeResponse } from '@/services/places.types'

export async function getPlacesByCountryCode(
    countryCode: string,
    categoriesIds: string | undefined,
): Promise<GetPlacesByCountryCodeResponse> {
    const url =
        process.env.NEXT_PUBLIC_API_URL + '/countries/' + countryCode + '/places?categories_ids=' + categoriesIds
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function getPlaceById(placeId: string): Promise<GetPlaceByIdResponse> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places/' + placeId
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        if (res.status === 404) {
            notFound()
        }

        throw new Error(res.statusText)
    }

    return res.json()
}

export async function getPlacesAround({
    lat,
    lng,
    radius,
    categories,
    limit,
}: GetPlacesAroundParams): Promise<GetPlacesAroundResponse> {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        radius: radius.toString(),
        categories_ids: categories.join(),

        ...(limit && { limit: limit.toString() }),
    })
    const url = process.env.NEXT_PUBLIC_API_URL + '/places-around?' + params.toString()
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
