import type { PaginatedResponse } from '@/utils/types/common'
import type { AddReviewInputs, DeleteReviewInputs, EditReviewInputs, IReview } from '@/utils/types/review'

import { api } from './api'

export const reviewsAPI = api.injectEndpoints({
    endpoints: build => ({
        getReviewsByPlaceId: build.query<PaginatedResponse<IReview>, { placeId: number; page: number }>({
            query: ({ placeId, page }) => `reviews?place_id=${placeId}&page=${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newResponse, otherArgs) => {
                if (otherArgs.arg.page === 1) {
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

        getReviewsByUserId: build.query<PaginatedResponse<IReview>, { userId: number; page: number }>({
            query: ({ userId, page }) => `reviews?user_id=${userId}&page=${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newResponse, otherArgs) => {
                if (otherArgs.arg.page === 1) {
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

        addReview: build.mutation<void, AddReviewInputs>({
            query: inputs => ({
                url: 'reviews',
                method: 'POST',
                body: inputs,
            }),
            invalidatesTags: (result, error, inputs) => [
                { type: 'PlacesMeta', id: inputs.placeId },
                { type: 'PlaceReviews', id: inputs.placeId },
                { type: 'UserReviews', id: inputs.userId },
            ],
        }),

        editReview: build.mutation<void, EditReviewInputs>({
            query: inputs => ({
                url: `reviews/${inputs.reviewId}`,
                method: 'PATCH',
                body: inputs,
            }),
            invalidatesTags: (result, error, inputs) => [
                { type: 'PlacesMeta', id: inputs.placeId },
                { type: 'PlaceReviews', id: inputs.placeId },
                { type: 'UserReviews', id: inputs.userId },
            ],
        }),

        deleteReview: build.mutation<void, DeleteReviewInputs>({
            query: inputs => ({
                url: `reviews/${inputs.reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, inputs) => [
                { type: 'PlacesMeta', id: inputs.placeId },
                { type: 'PlaceReviews', id: inputs.placeId },
                { type: 'UserReviews', id: inputs.userId },
            ],
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
