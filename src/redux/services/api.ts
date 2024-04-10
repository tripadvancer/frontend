import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import Session from 'supertokens-web-js/recipe/session'

// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)
    if (result.error) {
        // Checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                // Try to get a new token
                void Session.attemptRefreshingSession().then(async hasSession => {
                    if (hasSession) {
                        // todo: get new userInfo and revelidate tags???
                        result = await baseQuery(args, api, extraOptions)
                    }
                })
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

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Favorites', 'PlaceReviews', 'Places', 'PlacesMeta', 'UserPlaces', 'UserReviews', 'Visited'],
    endpoints: () => ({}),
})
