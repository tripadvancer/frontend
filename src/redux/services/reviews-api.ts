import { AddReviewInputs, DeleteReviewInputs, EditReviewInputs } from '@/utils/types/review'

import { api } from './api'

export const reviewsAPI = api.injectEndpoints({
    endpoints: build => ({
        addReview: build.mutation<void, AddReviewInputs>({
            query: inputs => ({
                url: 'reviews',
                method: 'POST',
                body: inputs,
            }),
            invalidatesTags: (result, error, inputs) => [{ type: 'PlacesMeta', id: inputs.placeId }],
        }),

        editReview: build.mutation<void, EditReviewInputs>({
            query: inputs => ({
                url: `reviews/${inputs.reviewId}`,
                method: 'PATCH',
                body: inputs,
            }),
            invalidatesTags: (result, error, inputs) => [{ type: 'PlacesMeta', id: inputs.placeId }],
        }),

        deleteReview: build.mutation<void, DeleteReviewInputs>({
            query: inputs => ({
                url: `reviews/${inputs.reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, inputs) => [{ type: 'PlacesMeta', id: inputs.placeId }],
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
