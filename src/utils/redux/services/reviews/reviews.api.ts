import { api } from '@/utils/redux/services/api'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import {
    CreateReviewInputs,
    CreateReviewResponse,
    DeleteReviewInputs,
    GetReviewsByPlaceIdParams,
    GetReviewsByUserIdParams,
    GetReviewsResponse,
    UpdateReviewInputs,
} from '@/utils/redux/services/reviews/reviews.types'

export const reviewsAPI = api.injectEndpoints({
    endpoints: build => ({
        getReviewsByPlaceId: build.query<GetReviewsResponse, GetReviewsByPlaceIdParams>({
            query: ({ placeId, cursor }) => `reviews?place_id=${placeId}${cursor ? `&cursor=${cursor}` : ''}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newResponse, otherArgs) => {
                if (otherArgs.arg.cursor === undefined) {
                    return newResponse
                }

                if (currentCache) {
                    return {
                        ...newResponse,
                        items: [...currentCache.items, ...newResponse.items],
                    }
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
            providesTags: (result, error, { placeId }) => [{ type: 'PlaceReviews', id: placeId }],
        }),

        getReviewsByUserId: build.query<GetReviewsResponse, GetReviewsByUserIdParams>({
            query: ({ userId, cursor }) => `reviews?user_id=${userId}${cursor ? `&cursor=${cursor}` : ''}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newResponse, otherArgs) => {
                if (otherArgs.arg.cursor === undefined) {
                    return newResponse
                }

                if (currentCache) {
                    return {
                        ...newResponse,
                        items: [...currentCache.items, ...newResponse.items],
                    }
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
            providesTags: (result, error, { userId }) => [{ type: 'UserReviews', id: userId }],
        }),

        createReview: build.mutation<CreateReviewResponse, CreateReviewInputs>({
            query: inputs => ({
                url: 'reviews',
                method: 'POST',
                body: inputs,
            }),
            invalidatesTags: (result, error, { placeId }) => [{ type: 'PlaceMeta', id: placeId }, 'Visited', 'Places'],
            async onQueryStarted({ placeId }, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled

                const optimisticResultPlacePage = dispatch(
                    reviewsAPI.util.updateQueryData('getReviewsByPlaceId', { placeId, cursor: undefined }, draft => {
                        draft.total += 1
                        draft.items.unshift(data)
                    }),
                )

                const optimisticResultPlaceMeta = dispatch(
                    placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                        draft.ownReview = data
                    }),
                )

                try {
                    await queryFulfilled
                } catch {
                    optimisticResultPlacePage.undo()
                    optimisticResultPlaceMeta.undo()
                }
            },
        }),

        updateReview: build.mutation<void, UpdateReviewInputs>({
            query: inputs => ({
                url: `reviews/${inputs.reviewId}`,
                method: 'PATCH',
                body: inputs,
            }),
            invalidatesTags: (result, error, { placeId }) => [{ type: 'PlaceMeta', id: placeId }, 'Visited', 'Places'],
            async onQueryStarted({ reviewId, placeId, userId, rating, text }, { dispatch, queryFulfilled }) {
                const optimisticResultPlacePage = dispatch(
                    reviewsAPI.util.updateQueryData('getReviewsByPlaceId', { placeId, cursor: undefined }, draft => {
                        const review = draft.items.find(review => review.id === reviewId)
                        if (review) {
                            review.rating = rating
                            review.text = text
                        }
                    }),
                )

                const optimisticResultUserPage = dispatch(
                    reviewsAPI.util.updateQueryData('getReviewsByUserId', { userId, cursor: undefined }, draft => {
                        const review = draft.items.find(review => review.id === reviewId)
                        if (review) {
                            review.rating = rating
                            review.text = text
                        }
                    }),
                )

                const optimisticResultPlaceMeta = dispatch(
                    placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                        const review = draft.ownReview
                        if (review) {
                            review.rating = rating
                            review.text = text
                        }
                    }),
                )

                try {
                    await queryFulfilled
                } catch {
                    optimisticResultPlacePage.undo()
                    optimisticResultUserPage.undo()
                    optimisticResultPlaceMeta.undo()
                }
            },
        }),

        deleteReview: build.mutation<void, DeleteReviewInputs>({
            query: inputs => ({
                url: `reviews/${inputs.reviewId}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ reviewId, placeId, userId }, { dispatch, queryFulfilled }) {
                const optimisticResultPlacePage = dispatch(
                    reviewsAPI.util.updateQueryData('getReviewsByPlaceId', { placeId, cursor: undefined }, draft => {
                        draft.total -= 1
                        draft.items = draft.items.filter(review => review.id !== reviewId)
                    }),
                )

                const optimisticResultUserPage = dispatch(
                    reviewsAPI.util.updateQueryData('getReviewsByUserId', { userId, cursor: undefined }, draft => {
                        draft.total -= 1
                        draft.items = draft.items.filter(review => review.id !== reviewId)
                    }),
                )

                const optimisticResultPlaceMeta = dispatch(
                    placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                        draft.ownReview = null
                    }),
                )

                try {
                    await queryFulfilled
                } catch {
                    optimisticResultPlacePage.undo()
                    optimisticResultUserPage.undo()
                    optimisticResultPlaceMeta.undo()
                }
            },
        }),

        reviewPhotoUpload: build.mutation<{ url: string }, FormData>({
            query: formData => ({
                url: 'images/review-photo',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
    overrideExisting: false,
})
