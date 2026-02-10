import { api } from '@/redux/services/api'
import { PlaceComplaintInputs, ReviewComplaintInputs } from '@/redux/services/complain/complain.types'

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
