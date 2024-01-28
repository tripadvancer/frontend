import { LngLatBounds } from 'react-map-gl/maplibre'

import { notFound } from 'next/navigation'

import type { PaginatedResponse } from '@/utils/types/common'
import { GeoJsonCollection } from '@/utils/types/geo'
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

export async function getPlaceByBounds({
    mapBounds,
    selectedCategories,
}: {
    mapBounds: LngLatBounds
    selectedCategories: number[]
}): Promise<GeoJsonCollection<IPlacePreview>> {
    const categories_ids = '?categories_ids=' + selectedCategories.join()
    const ne_lat = '&ne_lat=' + mapBounds?.getNorthEast().lat
    const ne_lng = '&ne_lng=' + mapBounds?.getNorthEast().lng
    const sw_lat = '&sw_lat=' + mapBounds?.getSouthWest().lat
    const sw_lng = '&sw_lng=' + mapBounds?.getSouthWest().lng
    const url = process.env.NEXT_PUBLIC_API_URL + '/places' + categories_ids + ne_lat + ne_lng + sw_lat + sw_lng
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

export async function getPlaceById(placeId: string, accessToken?: string): Promise<IPlace> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places/' + placeId
    const res = await fetch(url, {
        headers: accessToken ? { Authorization: 'Bearer ' + accessToken } : {},
    })

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

export async function createPlace(body: CreatePlaceInputs): Promise<{ id: number }> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function updatePlaceById(placeId: string, body: UpdatePlaceInputs): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places/' + placeId
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
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

export async function deletePlaceById(placeId: string): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places/' + placeId
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}
