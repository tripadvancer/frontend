import type {
    ChangeUserEmailInputs,
    ChangeUserEmailResponse,
    ChangeUserPasswordInputs,
    ChangeUserPasswordResponse,
    ConfirmUserDeletionResponse,
    IUserInfo,
    RestoreUserResponse,
    UpdateUserInfoInputs,
    UpdateUserInfoResponse,
} from '@/utils/types/user'

import { api } from './api'

export const userAPI = api.injectEndpoints({
    endpoints: build => ({
        getUserInfo: build.query<IUserInfo, void>({
            query: () => 'user',
            providesTags: ['UserInfo'],
        }),

        updateUserInfo: build.mutation<UpdateUserInfoResponse, UpdateUserInfoInputs>({
            query: inputs => ({
                url: 'user',
                method: 'PATCH',
                body: inputs,
            }),
            invalidatesTags: ['UserInfo'],
        }),

        changeUserPassword: build.mutation<ChangeUserPasswordResponse, ChangeUserPasswordInputs>({
            query: inputs => ({
                url: 'user/password',
                method: 'PATCH',
                body: inputs,
            }),
        }),

        changeUserEmail: build.mutation<ChangeUserEmailResponse, ChangeUserEmailInputs>({
            query: inputs => ({
                url: 'user/email',
                method: 'PATCH',
                body: inputs,
            }),
        }),

        updateUserAvatar: build.mutation<void, FormData>({
            query: formData => ({
                url: 'user/avatar',
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['UserInfo'],
        }),

        deleteUserAvatar: build.mutation<void, void>({
            query: () => ({
                url: 'user/avatar',
                method: 'DELETE',
            }),
            invalidatesTags: ['UserInfo'],
        }),

        requestPersonalData: build.mutation<void, void>({
            query: () => 'user/personal-data',
        }),

        requestUserDeletion: build.mutation<void, void>({
            query: () => ({
                url: 'user',
                method: 'DELETE',
            }),
        }),

        confirmUserDeletion: build.mutation<ConfirmUserDeletionResponse, { token: string }>({
            query: token => ({
                url: 'user/confirm-deletion',
                method: 'POST',
                body: { token },
            }),
        }),

        restoreUser: build.mutation<RestoreUserResponse, { token: string }>({
            query: token => ({
                url: 'user/restore',
                method: 'POST',
                body: { token },
            }),
        }),
    }),
    overrideExisting: false,
})
