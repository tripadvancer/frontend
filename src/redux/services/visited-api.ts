import type { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlacePreview } from '@/utils/types/place'

import { api } from './api'
import { placesAPI } from './places-api'

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
            async onQueryStarted(placeId, { dispatch, queryFulfilled }) {
                const optimisticResult = dispatch(
                    placesAPI.util.updateQueryData('getPlaceById', placeId, draft => {
                        draft.isVisited = true
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    optimisticResult.undo()
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Visited' }, { type: 'Places' }, { type: 'Places', id }],
        }),
        deletePlaceFromVisited: build.mutation<void, number>({
            query: id => ({
                url: `visited/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(placeId, { dispatch, queryFulfilled }) {
                const optimisticResult = dispatch(
                    placesAPI.util.updateQueryData('getPlaceById', placeId, draft => {
                        draft.isVisited = false
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    optimisticResult.undo()
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Visited' }, { type: 'Places' }, { type: 'Places', id }],
        }),
    }),
    overrideExisting: false,
})
