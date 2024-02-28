import type { PlaceComplaintInputs, ReviewComplaintInputs } from '@/utils/types/complaint'

import { api } from './api'

export const complainAPI = api.injectEndpoints({
    endpoints: build => ({
        complainAboutPlace: build.mutation<void, PlaceComplaintInputs>({
            query: inputs => ({
                url: `places/${inputs.placeId}/complaints`,
                method: 'POST',
                body: inputs,
            }),
        }),

        complainAboutReview: build.mutation<void, ReviewComplaintInputs>({
            query: inputs => ({
                url: `reviews/${inputs.reviewId}/complaints`,
                method: 'POST',
                body: inputs,
            }),
        }),
    }),
    overrideExisting: false,
})
