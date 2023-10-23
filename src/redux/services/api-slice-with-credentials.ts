import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import type { AuthResponse } from '@/types/auth'

import { setCredentials, unsetCredentials } from '@/redux/features/user-slice'
import { RootState } from '@/redux/store'
import { ApiErrorStatusCode } from '@/utils/enums'

// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).user.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === ApiErrorStatusCode.UNAUTHORIZED) {
        // Checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                // Try to get a new token
                const refreshResult = await baseQuery('auth/refresh-token', api, extraOptions)
                if (refreshResult.data) {
                    // Store the new token
                    api.dispatch(setCredentials(refreshResult.data as AuthResponse))
                    // Retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(unsetCredentials())
                }
            } finally {
                // Release must be called once the mutex should be released again.
                release()
            }
        } else {
            // Wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export const apiSliceWithCredentials = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Reviews'],
    endpoints: () => ({}),
})
