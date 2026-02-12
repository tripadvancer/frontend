import { api } from '@/utils/redux/services/api'
import {
    GetPlacesAroundParams,
    GetPlacesAroundResponse,
    GetRandomPlaceResponse,
} from '@/utils/redux/services/places-around/places-around.types'

export const placesAroundAPI = api.injectEndpoints({
    endpoints: build => ({
        getRandomPlace: build.query<GetRandomPlaceResponse, GetPlacesAroundParams>({
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

        getPlacesAround: build.query<GetPlacesAroundResponse, GetPlacesAroundParams>({
            query: params => ({
                url: 'places-around',
                params: {
                    lng: params.lng,
                    lat: params.lat,
                    radius: params.radius,
                    categories_ids: params.categories.join(),
                    limit: params.limit,
                },
            }),
        }),
    }),
    overrideExisting: false,
})
