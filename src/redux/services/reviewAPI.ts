import type { PaginatedResponse } from '@/types/common'
import type { CreateReviewComplaintInputs } from '@/types/complaint'
import type { CreateReviewInputs, IReview, UpdateReviewInputs } from '@/types/review'

import { apiSliceWithCredentials } from './apiSliceWithCredentials'

type GetReviewsParams = {
    placeId?: number
    userId?: number
    page?: number
}

export const reviewsAPI = apiSliceWithCredentials.injectEndpoints({
    endpoints: build => ({
        getReviews: build.query<PaginatedResponse<IReview>, GetReviewsParams>({
            query: params => {
                const queryParams = []

                if (params.placeId) {
                    queryParams.push(`place_id=${params.placeId}`)
                }

                if (params.userId) {
                    queryParams.push(`user_id=${params.userId}`)
                }

                if (params.page) {
                    queryParams.push(`page=${params.page}`)
                }

                return `reviews?${queryParams.join('&')}`
            },
            providesTags: result =>
                result
                    ? [
                          ...result.items.map(({ id }) => ({ type: 'Reviews', id }) as const),
                          { type: 'Reviews', id: 'LIST' },
                      ]
                    : [{ type: 'Reviews', id: 'LIST' }],
        }),

        createReview: build.mutation<void, CreateReviewInputs>({
            query: body => ({
                url: 'reviews',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Reviews', id: 'LIST' }, 'User'],
        }),

        updateReview: build.mutation<void, UpdateReviewInputs>({
            query: ({ reviewId, ...patch }) => ({
                url: `reviews/${reviewId}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { reviewId }) => [{ type: 'Reviews', reviewId }],
        }),

        removeReview: build.mutation<void, number>({
            query: reviewId => ({
                url: `reviews/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, reviewId) => [{ type: 'Reviews', reviewId }, 'User'],
        }),

        createReviewComplaint: build.mutation<void, CreateReviewComplaintInputs>({
            query: ({ reviewId, ...body }) => ({
                url: `reviews/${reviewId}/complaints`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
})
