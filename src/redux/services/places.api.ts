import { api } from '@/redux/services/api'
import {
    CreatePlaceInputs,
    CreatePlaceResponse,
    GetPlaceMetaByIdResponse,
    GetPlacesParams,
    GetPlacesResponse,
    ImageUploadResponse,
    UpdatePlaceInputs,
} from '@/redux/services/places.types'

export const placesAPI = api.injectEndpoints({
    endpoints: build => ({
        getPlacesByCenter: build.query<GetPlacesResponse, GetPlacesParams>({
            query: params => ({
                url: 'places',
                params: {
                    lat: params.lat,
                    lng: params.lng,
                    categories_ids: params.selectedCategories.join(),
                    skip_visited: params.skip_visited,
                },
            }),
            providesTags: ['Places'],
        }),

        getPlaceMetaById: build.query<GetPlaceMetaByIdResponse, number>({
            query: placeId => `places/${placeId}/meta`,
            providesTags: (result, error, placeId) => [{ type: 'PlaceMeta', id: placeId }],
        }),

        createPlace: build.mutation<CreatePlaceResponse, CreatePlaceInputs>({
            query: inputs => ({
                url: 'places',
                method: 'POST',
                body: inputs,
            }),
            invalidatesTags: ['Visited', 'Places'],
        }),

        updatePlace: build.mutation<void, UpdatePlaceInputs>({
            query: inputs => ({
                url: `places/${inputs.placeId}`,
                method: 'PATCH',
                body: inputs,
            }),
            invalidatesTags: (result, error, { placeId }) => [{ type: 'PlaceMeta', id: placeId }, 'Visited', 'Places'],
        }),

        deletePlace: build.mutation<void, number>({
            query: placeId => ({
                url: `places/${placeId}`,
                method: 'DELETE',
            }),
        }),

        placePhotoUpload: build.mutation<ImageUploadResponse, File>({
            query: file => {
                const formData = new FormData()
                formData.append('file', file)
                return {
                    url: 'images/place-photo',
                    method: 'POST',
                    body: formData,
                }
            },
        }),
    }),
    overrideExisting: false,
})
