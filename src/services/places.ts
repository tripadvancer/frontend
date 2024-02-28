import { notFound } from 'next/navigation'

import type { PaginatedResponse } from '@/utils/types/common'
import type { CreatePlaceInputs, IPlace, IPlaceNearby, IPlacePreview, UpdatePlaceInputs } from '@/utils/types/place'

export async function getPlacesByCountryCode(
    countryCode: string,
    categoriesIds: string | undefined,
): Promise<IPlacePreview[]> {
    const url =
        process.env.NEXT_PUBLIC_API_URL + '/countries/' + countryCode + '/places?categories_ids=' + categoriesIds
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function getPlacesByUserId(userId: string, page: string): Promise<PaginatedResponse<IPlacePreview>> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/users/' + userId + '/places?page=' + page
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function getPlaceById(placeId: string): Promise<IPlace> {
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

export async function getPlacesNearby(placeId: string): Promise<IPlaceNearby[]> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places/' + placeId + '/nearby'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function placeCoverUpload(file: File): Promise<{ url: string }> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/images/place-cover'
    const formData = new FormData()

    formData.append('file', file)

    const res = await fetch(url, {
        method: 'POST',
        body: formData,
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function placePhotoUpload(file: File): Promise<{ url: string }> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/images/place-photo'
    const formData = new FormData()

    formData.append('file', file)

    const res = await fetch(url, {
        method: 'POST',
        body: formData,
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
