import type { IPlaceNearby, IRandomPlace } from '@/utils/types/place'

import { api } from './api'

interface GetRandomPlaceParams {
    lat: number
    lng: number
    radius: number
    categories: number[]
}

interface GetPlacesAroundParams {
    lat: number
    lng: number
    radius: number
    categories: number[]
    limit?: number
}

export const placesAroundAPI = api.injectEndpoints({
    endpoints: build => ({
        getRandomPlace: build.query<IRandomPlace, GetRandomPlaceParams>({
            query: params => ({
                url: 'places-around/random',
                params: {
                    lng: params.lng,
                    lat: params.lat,
                    radius: params.radius,
                    categories_ids: params.categories.join(),
                },
            }),
        }),
        getPlacesAround: build.query<IPlaceNearby[], GetPlacesAroundParams>({
            query: params => ({
                url: 'places-around',
                params: {
                    lng: params.lng,
                    lat: params.lat,
                    radius: params.radius,
                    categories_ids: params.categories.join(),
                    limit: params.limit || '',
                },
            }),
        }),
    }),
    overrideExisting: false,
})
