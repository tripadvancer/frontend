import type { PaginatedReview } from '@/utils/types/common'
import type { IReview } from '@/utils/types/review'

import { api } from './api'

interface GetReviewsParams {
    placeId: string
    page: string
}

export const reviewsAPI = api.injectEndpoints({
    endpoints: build => ({
        getReviewsByPlaceId: build.query<PaginatedReview<IReview>, GetReviewsParams>({
            query: params => `reviews?place_id=${params.placeId}&page=${params.page}`,
            providesTags: result =>
                result
                    ? [
                          ...result.items.map(({ id }) => ({ type: 'Reviews' as const, id })),
                          { type: 'Reviews', id: 'LIST' },
                      ]
                    : [{ type: 'Reviews', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})
