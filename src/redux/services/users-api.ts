import type { PaginatedResponse } from '@/utils/types/common'
import type { IPlacePreview } from '@/utils/types/place'

import { api } from './api'

export const usersAPI = api.injectEndpoints({
    endpoints: build => ({
        getPlacesByUserId: build.query<PaginatedResponse<IPlacePreview>, { userId: number; page: number }>({
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
