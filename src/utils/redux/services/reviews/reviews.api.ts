import { api } from '@/utils/redux/services/api'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { ImageUploadResponse } from '@/utils/redux/services/places/places.types'
import {
    CreateReviewInputs,
    CreateReviewResponse,
    DeleteReviewInputs,
    GetReviewsByPlaceIdParams,
    GetReviewsByUserIdParams,
    GetReviewsResponse,
    UpdateReviewInputs,
} from '@/utils/redux/services/reviews/reviews.types'
import { IReview } from '@/utils/types/common'

// Infinite scroll: one cache entry per endpoint, the first page (no cursor) replaces it and next pages are appended
const paginatedReviews = {
    serializeQueryArgs: ({ endpointName }: { endpointName: string }) => endpointName,
    merge: (
        currentCache: GetReviewsResponse,
        newResponse: GetReviewsResponse,
        { arg }: { arg: { cursor?: number } },
    ) =>
        arg.cursor === undefined
            ? newResponse
            : { ...newResponse, items: [...currentCache.items, ...newResponse.items] },
    forceRefetch: ({ currentArg, previousArg }: { currentArg?: unknown; previousArg?: unknown }) =>
        currentArg !== previousArg,
}

export const reviewsAPI = api.injectEndpoints({
    endpoints: build => ({
        getReviewsByPlaceId: build.query<GetReviewsResponse, GetReviewsByPlaceIdParams>({
            query: ({ placeId, cursor }) => ({ url: 'reviews', params: { place_id: placeId, cursor } }),
            ...paginatedReviews,
            providesTags: (result, error, { placeId }) => [{ type: 'PlaceReviews', id: placeId }],
        }),

        getReviewsByUserId: build.query<GetReviewsResponse, GetReviewsByUserIdParams>({
            query: ({ userId, cursor }) => ({ url: 'reviews', params: { user_id: userId, cursor } }),
            ...paginatedReviews,
            providesTags: (result, error, { userId }) => [{ type: 'UserReviews', id: userId }],
        }),

        createReview: build.mutation<CreateReviewResponse, CreateReviewInputs>({
            query: ({ userId, ...body }) => ({
                url: 'reviews',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { placeId }) => [{ type: 'PlaceMeta', id: placeId }, 'Places'],
            async onQueryStarted({ placeId }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(
                        reviewsAPI.util.updateQueryData('getReviewsByPlaceId', { placeId }, draft => {
                            draft.total += 1
                            draft.items.unshift(data)
                        }),
                    )
                    dispatch(
                        placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                            draft.ownReview = data
                        }),
                    )
                } catch {
                    // The caller handles the request error
                }
            },
        }),

        updateReview: build.mutation<void, UpdateReviewInputs>({
            query: ({ reviewId, userId, ...body }) => ({
                url: `reviews/${reviewId}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, { placeId }) => [{ type: 'PlaceMeta', id: placeId }, 'Places'],
            async onQueryStarted({ reviewId, placeId, userId, rating, text }, { dispatch, queryFulfilled }) {
                const patchReview = (review: IReview | null | undefined) => {
                    if (review?.id === reviewId) {
                        review.rating = rating
                        review.text = text
                    }
                }

                const patches = [
                    dispatch(
                        reviewsAPI.util.updateQueryData('getReviewsByPlaceId', { placeId }, draft => {
                            draft.items.forEach(patchReview)
                        }),
                    ),
                    dispatch(
                        reviewsAPI.util.updateQueryData('getReviewsByUserId', { userId }, draft => {
                            draft.items.forEach(patchReview)
                        }),
                    ),
                    dispatch(
                        placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                            patchReview(draft.ownReview)
                        }),
                    ),
                ]

                try {
                    await queryFulfilled
                } catch {
                    patches.forEach(patch => patch.undo())
                }
            },
        }),

        deleteReview: build.mutation<void, DeleteReviewInputs>({
            query: ({ reviewId }) => ({
                url: `reviews/${reviewId}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ reviewId, placeId, userId }, { dispatch, queryFulfilled }) {
                const removeReview = (draft: GetReviewsResponse) => {
                    draft.total -= 1
                    draft.items = draft.items.filter(review => review.id !== reviewId)
                }

                const patches = [
                    dispatch(reviewsAPI.util.updateQueryData('getReviewsByPlaceId', { placeId }, removeReview)),
                    dispatch(reviewsAPI.util.updateQueryData('getReviewsByUserId', { userId }, removeReview)),
                    dispatch(
                        placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                            draft.ownReview = null
                        }),
                    ),
                ]

                try {
                    await queryFulfilled
                } catch {
                    patches.forEach(patch => patch.undo())
                }
            },
        }),

        reviewPhotoUpload: build.mutation<ImageUploadResponse, FormData>({
            query: formData => ({
                url: 'images/review-photo',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
    overrideExisting: false,
})
