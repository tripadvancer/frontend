import type {
    AuthResponse,
    ForgotPasswordInputs,
    ResetPasswordInputs,
    SignInInputs,
    SignUpInputs,
    StatusResponse,
    TokenInputs,
} from '@/types/auth'

import { apiSliceWithCredentials } from '@/redux/services/api-slice-with-credentials'

export const authAPI = apiSliceWithCredentials.injectEndpoints({
    endpoints: build => ({
        signUp: build.mutation<AuthResponse, SignUpInputs>({
            query: body => ({
                url: 'auth/sign-up',
                method: 'POST',
                body,
            }),
            invalidatesTags: [],
        }),

        signIn: build.mutation<AuthResponse, SignInInputs>({
            query: body => ({
                url: 'auth/sign-in',
                method: 'POST',
                body,
            }),
            invalidatesTags: [],
        }),

        signOut: build.mutation<void, void>({
            query: () => ({
                url: 'auth/sign-out',
                method: 'POST',
            }),
            invalidatesTags: [],
        }),

        verify: build.mutation<StatusResponse, TokenInputs>({
            query: body => ({
                url: 'auth/verify',
                method: 'POST',
                body,
            }),
        }),

        refreshToken: build.query<AuthResponse, void>({
            query: () => ({
                url: 'auth/refresh-token',
                method: 'GET',
            }),
        }),

        forgotPassword: build.mutation<void, ForgotPasswordInputs>({
            query: body => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body,
            }),
        }),

        resetPassword: build.mutation<StatusResponse, ResetPasswordInputs>({
            query: body => ({
                url: 'auth/reset-password',
                method: 'POST',
                body,
            }),
        }),

        confirmRemoval: build.mutation<StatusResponse, TokenInputs>({
            query: body => ({
                url: 'auth/confirm-removal',
                method: 'POST',
                body,
            }),
        }),

        restore: build.mutation<StatusResponse, TokenInputs>({
            query: body => ({
                url: 'auth/restore',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
})
