import type { PlaceComplaintInputs, ReviewComplaintInputs } from '@/utils/types/complaint'

import { api } from './api'

export const complainAPI = api.injectEndpoints({
    endpoints: build => ({
        complainAboutPlace: build.mutation<void, PlaceComplaintInputs>({
            query: ({ placeId, ...body }) => ({
                url: `places/${placeId}/complaints`,
                method: 'POST',
                body,
            }),
        }),

        complainAboutReview: build.mutation<void, ReviewComplaintInputs>({
            query: ({ reviewId, ...body }) => ({
                url: `reviews/${reviewId}/complaints`,
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
})
