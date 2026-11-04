import { api } from '@/utils/redux/services/api'
import { GetFeedParams, GetFeedResponse } from '@/utils/redux/services/feed/feed.types'

export const feedAPI = api.injectEndpoints({
    endpoints: build => ({
        getFeed: build.query<GetFeedResponse, GetFeedParams>({
            query: ({ cursor, countryCodes }) => {
                const params = new URLSearchParams()
                if (cursor) params.set('cursor', cursor.toString())
                if (countryCodes.length > 0) params.set('country_codes', countryCodes.join(','))

                return `latest/feed${params.size > 0 ? `?${params.toString()}` : ''}`
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                const countryCodes = [...queryArgs.countryCodes].sort().join(',')
                return `${endpointName}-${countryCodes}`
            },
            merge: (currentCache, newResponse, { arg }) => {
                if (arg.cursor === undefined) {
                    return newResponse
                }

                if (currentCache) {
                    const currentItemIds = new Set(currentCache.items.map(item => item.id))
                    return {
                        ...newResponse,
                        items: [
                            ...currentCache.items,
                            ...newResponse.items.filter(item => !currentItemIds.has(item.id)),
                        ],
                    }
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.cursor !== previousArg?.cursor
            },
        }),
    }),
    overrideExisting: false,
})
