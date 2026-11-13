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
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const hasSession = await Session.attemptRefreshingSession()

                if (hasSession) {
                    result = await baseQuery(args, api, extraOptions)
                }
            } catch {
                return result
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Lists', 'PlaceReviews', 'Places', 'PlaceMeta', 'UserPlaces', 'UserReviews', 'Visited'],
    endpoints: () => ({}),
})
