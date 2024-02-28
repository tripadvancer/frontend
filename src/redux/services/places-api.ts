import { LngLatBounds } from 'react-map-gl'

import type { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlace, IPlaceMeta, IPlacePreview } from '@/utils/types/place'

import { api } from './api'

interface GetPlacesParams {
    mapBounds: LngLatBounds | undefined
    selectedCategories: number[]
}

export const placesAPI = api.injectEndpoints({
    endpoints: build => ({
        getPlaces: build.query<GeoJsonCollection<IPlacePreview>, GetPlacesParams>({
            query: params => ({
                url: 'places',
                params: {
                    categories_ids: params.selectedCategories.join(),
                    ne_lat: params.mapBounds?._ne.lat,
                    ne_lng: params.mapBounds?._ne.lng,
                    sw_lat: params.mapBounds?._sw.lat,
                    sw_lng: params.mapBounds?._sw.lng,
                },
            }),
            providesTags: ['Places'],
        }),

        getPlaceById: build.query<IPlace, number>({
            query: placeId => `places/${placeId}`,
            providesTags: (result, error, placeId) => [{ type: 'Places', id: placeId }],
        }),

        getPlaceMetaById: build.query<IPlaceMeta, number>({
            query: placeId => `places/${placeId}/meta`,
            providesTags: (result, error, placeId) => [{ type: 'PlacesMeta', id: placeId }],
        }),
    }),
    overrideExisting: false,
})
