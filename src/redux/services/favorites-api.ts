import type { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlacePreview } from '@/utils/types/place'

import { apiSliceWithCredentials } from './api'

export const favoritesAPI = apiSliceWithCredentials.injectEndpoints({
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
            invalidatesTags: ['Favorites', 'Places', 'Visited'],
        }),

        deletePlaceFromFavorite: build.mutation<void, number>({
            query: id => ({
                url: `favorites/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Favorites', 'Places', 'Visited'],
        }),
    }),
    overrideExisting: false,
})
