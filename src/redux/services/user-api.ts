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
            query: body => ({
                url: 'user',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['UserInfo'],
        }),
        changeUserPassword: build.mutation<ChangeUserPasswordResponse, ChangeUserPasswordInputs>({
            query: body => ({
                url: 'user/password',
                method: 'PATCH',
                body,
            }),
        }),
        changeUserEmail: build.mutation<ChangeUserEmailResponse, ChangeUserEmailInputs>({
            query: body => ({
                url: 'user/email',
                method: 'PATCH',
                body,
            }),
        }),
        updateUserAvatar: build.mutation<void, File>({
            query: file => ({
                url: 'user/avatar',
                method: 'PATCH',
                body: file,
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
