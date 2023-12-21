import { LngLatBounds } from 'react-map-gl'

import { notFound } from 'next/navigation'

import type { PaginatedResponse } from '@/utils/types/common'
import { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlace, IPlaceNearby, IPlacePreview } from '@/utils/types/place'

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

export async function deletePlaceById(placeId: string): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places/' + placeId
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}
