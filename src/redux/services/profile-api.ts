import type { IUserProfile, UpdateUserPasswordInputs, UpdateUserProfileInputs } from '@/types/user'

import { apiSliceWithCredentials } from '@/redux/services/api-slice-with-credentials'

export const profileAPI = apiSliceWithCredentials.injectEndpoints({
    endpoints: build => ({
        getProfile: build.query<IUserProfile, void>({
            query: () => 'profile',
            // providesTags: ['Profile'],
        }),

        updateProfile: build.mutation<void, UpdateUserProfileInputs>({
            query: body => ({
                url: 'profile',
                method: 'PATCH',
                body,
            }),
            // invalidatesTags: ['Profile', 'User'],
        }),

        updateUserPassword: build.mutation<void, UpdateUserPasswordInputs>({
            query: body => ({
                url: 'profile/password',
                method: 'PATCH',
                body,
            }),
        }),

        requestUserRemoval: build.mutation<void, void>({
            query: () => ({
                url: 'profile/',
                method: 'DELETE',
            }),
        }),

        requestPersonalData: build.mutation<void, void>({
            query: () => ({
                url: 'profile/stored-data',
                method: 'GET',
            }),
        }),

        // TODO: add types response and body
        updateUserAvatar: build.mutation({
            query: body => ({
                url: 'profile/avatar',
                method: 'PATCH',
                body,
            }),
            // invalidatesTags: ['User'],
        }),

        // TODO: add types response and body
        updateUserCover: build.mutation({
            query: body => ({
                url: 'profile/cover',
                method: 'PATCH',
                body,
            }),
            // invalidatesTags: ['User'],
        }),

        deleteUserAvatar: build.mutation<void, void>({
            query: () => ({
                url: 'profile/avatar',
                method: 'DELETE',
            }),
            // invalidatesTags: ['User'],
        }),

        deleteUserCover: build.mutation<void, void>({
            query: () => ({
                url: 'profile/cover',
                method: 'DELETE',
            }),
            // invalidatesTags: ['User'],
        }),
    }),
    overrideExisting: false,
})
