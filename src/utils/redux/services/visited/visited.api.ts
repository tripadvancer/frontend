import { api } from '@/utils/redux/services/api'
import { placesAPI } from '@/utils/redux/services/places/places.api'

export const visitedAPI = api.injectEndpoints({
    endpoints: build => ({
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
            invalidatesTags: ['Places'],
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
            invalidatesTags: ['Places'],
        }),
    }),
    overrideExisting: false,
})
