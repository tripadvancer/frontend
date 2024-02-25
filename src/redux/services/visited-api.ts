import type { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlacePreview } from '@/utils/types/place'

import { api } from './api'

export const visitedAPI = api.injectEndpoints({
    endpoints: build => ({
        getVisited: build.query<GeoJsonCollection<IPlacePreview>, void>({
            query: () => 'visited',
            providesTags: ['Visited'],
        }),
        addPlaceToVisited: build.mutation<void, number>({
            query: placeId => ({
                url: 'visited',
                method: 'POST',
                body: { placeId },
            }),
            invalidatesTags: ['Places', 'Visited'],
        }),
        deletePlaceFromVisited: build.mutation<void, number>({
            query: id => ({
                url: `visited/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Places', 'Visited'],
        }),
    }),
    overrideExisting: false,
})
