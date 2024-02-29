import { LngLatBounds } from 'react-map-gl'

import type { GeoJsonCollection } from '@/utils/types/geo'
import type { CreatePlaceInputs, IPlace, IPlaceMeta, IPlacePreview, UpdatePlaceInputs } from '@/utils/types/place'

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

        getPlaceMetaById: build.query<IPlaceMeta, number>({
            query: placeId => `places/${placeId}/meta`,
            providesTags: (result, error, placeId) => [{ type: 'PlacesMeta', id: placeId }],
        }),

        addPlace: build.mutation<{ id: number }, CreatePlaceInputs>({
            query: inputs => ({
                url: 'places',
                method: 'POST',
                body: inputs,
            }),
        }),

        editPlace: build.mutation<void, UpdatePlaceInputs>({
            query: inputs => ({
                url: `places/${inputs.placeId}`,
                method: 'PATCH',
                body: inputs,
            }),
        }),

        deletePlace: build.mutation<void, number>({
            query: placeId => ({
                url: `places/${placeId}`,
                method: 'DELETE',
            }),
        }),

        placeCoverUpload: build.mutation<{ url: string }, FormData>({
            query: formData => ({
                url: 'images/place-cover',
                method: 'POST',
                body: formData,
            }),
        }),

        placePhotoUpload: build.mutation<{ url: string }, FormData>({
            query: formData => ({
                url: 'images/place-photo',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
    overrideExisting: false,
})
