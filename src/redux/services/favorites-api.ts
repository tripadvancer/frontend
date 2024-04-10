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
            invalidatesTags: (result, error, placeId) => [
                { type: 'Favorites' },
                { type: 'Places' },
                { type: 'PlacesMeta', id: placeId },
                { type: 'Visited' },
                { type: 'Random' },
            ],
        }),

        deletePlaceFromFavorite: build.mutation<void, number>({
            query: placeId => ({
                url: `favorites/${placeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, placeId) => [
                { type: 'Favorites' },
                { type: 'Places' },
                { type: 'PlacesMeta', id: placeId },
                { type: 'Visited' },
                { type: 'Random' },
            ],
        }),
    }),
    overrideExisting: false,
})
