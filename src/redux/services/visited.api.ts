import { api } from '@/redux/services/api'
import { placesAPI } from '@/redux/services/places.api'
import { GetVisitedResponse } from '@/redux/services/visited.types'

export const visitedAPI = api.injectEndpoints({
    endpoints: build => ({
        getVisited: build.query<GetVisitedResponse, void>({
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
                    placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                        draft.isVisited = true
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    optimisticResult.undo()
                }
            },
            invalidatesTags: ['Visited', 'Places'],
        }),

        deletePlaceFromVisited: build.mutation<void, number>({
            query: placeId => ({
                url: `visited/${placeId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(placeId, { dispatch, queryFulfilled }) {
                const optimisticResult = dispatch(
                    placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                        draft.isVisited = false
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    optimisticResult.undo()
                }
            },
            invalidatesTags: ['Visited', 'Places'],
        }),
    }),
    overrideExisting: false,
})
