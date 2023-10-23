import type { IUser } from '@/types/user'

import { apiSliceWithCredentials } from '@/redux/services/api-slice-with-credentials'

interface GetUserPlacesParams {
    userId: number
    page: number
}

export const usersAPI = apiSliceWithCredentials.injectEndpoints({
    endpoints: build => ({
        getUser: build.query<IUser, number | void>({
            query: userId => 'users/' + userId,
            providesTags: ['User'],
        }),

        // getUserPlaces: build.query<PaginatedResponse<IPlacePreview>, GetUserPlacesParams>({
        //     query: ({ userId, page }) => `users/${userId}/places?page=${page}`,
        //     providesTags: ['UserPlaces'],
        // }),
    }),
    overrideExisting: false,
})
