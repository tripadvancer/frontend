import { api } from '@/utils/redux/services/api'
import { GetPlacesByUserIdParams, GetPlacesByUserIdResponse } from '@/utils/redux/services/users/users.types'

export const usersAPI = api.injectEndpoints({
    endpoints: build => ({
        getPlacesByUserId: build.query<GetPlacesByUserIdResponse, GetPlacesByUserIdParams>({
            query: ({ userId, page }) => `users/${userId}/places?page=${page}`,
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
            providesTags: (result, error, { userId }) => [{ type: 'UserPlaces', id: userId }],
        }),
    }),
    overrideExisting: false,
})
