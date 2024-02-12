import { LngLatBounds } from 'react-map-gl'

import type { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlacePreview } from '@/utils/types/place'

import { apiSliceWithCredentials } from './api'

interface GetPlacesParams {
    mapBounds: LngLatBounds | undefined
    selectedCategories: number[]
}

export const placesAPI = apiSliceWithCredentials.injectEndpoints({
    endpoints: build => ({
        getPlaces: build.query<GeoJsonCollection<IPlacePreview>, GetPlacesParams>({
            query: params => ({
                url: 'places',
                params: {
                    categories_ids: params.selectedCategories.join(),
                    ne_lat: params.mapBounds?.getNorthEast().lat,
                    ne_lng: params.mapBounds?.getNorthEast().lng,
                    sw_lat: params.mapBounds?.getSouthWest().lat,
                    sw_lng: params.mapBounds?.getSouthWest().lng,
                },
            }),
            providesTags: ['Places'],
        }),
    }),
    overrideExisting: false,
})
