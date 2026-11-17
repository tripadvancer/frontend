import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import Session from 'supertokens-web-js/recipe/session'

import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

// Settings are loaded before SuperTokens is initialized because the init needs the app name
const PUBLIC_ENDPOINTS = ['getSettings']

// Concurrent 401 responses wait for a single session refresh
const refreshMutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const isPublicEndpoint = PUBLIC_ENDPOINTS.includes(api.endpoint)

    if (!isPublicEndpoint) {
        await waitForSuperTokensInitialization()
    }

    await refreshMutex.waitForUnlock()

    const result = await baseQuery(args, api, extraOptions)

    if (result.error?.status !== 401 || isPublicEndpoint) {
        return result
    }

    if (refreshMutex.isLocked()) {
        await refreshMutex.waitForUnlock()
        return baseQuery(args, api, extraOptions)
    }

    const release = await refreshMutex.acquire()

    try {
        const hasSession = await Session.attemptRefreshingSession()
        return hasSession ? await baseQuery(args, api, extraOptions) : result
    } catch {
        return result
    } finally {
        release()
    }
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Lists', 'PlaceReviews', 'Places', 'PlaceMeta', 'UserPlaces', 'UserReviews'],
    endpoints: () => ({}),
})

// Responses that contain isSaved, isVisited or own lists and must be refetched when the user changes
export const USER_DEPENDENT_TAGS = ['Lists', 'Places', 'PlaceMeta', 'UserPlaces'] as const
