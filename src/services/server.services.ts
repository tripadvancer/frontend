'use server'

import { notFound } from 'next/navigation'

import { ICountry, IPlace, IPlaceNearby, IReview, PaginatedResponse } from '@/utils/interfaces'

export async function getCountries(): Promise<ICountry[]> {
    const url = process.env.API_URL + '/countries'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

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

export async function getPlacesNearby(placeId: string): Promise<IPlaceNearby[]> {
    const url = process.env.API_URL + '/places/' + placeId + '/nearby'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getReviewsByPlaceId(placeId: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.API_URL + '/reviews?place_id=' + placeId
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
