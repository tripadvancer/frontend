import type { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlacePreview } from '@/utils/types/place'

import { api } from './api'

export const favoritesAPI = api.injectEndpoints({
    endpoints: build => ({
        getFavorites: build.query<GeoJsonCollection<IPlacePreview>, void>({
            query: () => 'favorites',
            providesTags: ['Favorites'],
        }),

        addPlaceToFavorite: build.mutation<void, number>({
            query: placeId => ({
                url: 'favorites',
                method: 'POST',
                body: { placeId },
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Favorites' },
                { type: 'Places' },
                { type: 'PlacesMeta', id },
            ],
        }),

        deletePlaceFromFavorite: build.mutation<void, number>({
            query: id => ({
                url: `favorites/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Favorites' },
                { type: 'Places' },
                { type: 'PlacesMeta', id },
            ],
        }),
    }),
    overrideExisting: false,
})
