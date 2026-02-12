import { api } from '@/utils/redux/services/api'
import {
    CreatePlaceInputs,
    CreatePlaceResponse,
    GetPlaceMetaByIdResponse,
    GetPlacesParams,
    GetPlacesResponse,
    ImageUploadResponse,
    UpdatePlaceInputs,
} from '@/utils/redux/services/places/places.types'

export const placesAPI = api.injectEndpoints({
    endpoints: build => ({
        getPlaces: build.query<GetPlacesResponse, GetPlacesParams>({
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
