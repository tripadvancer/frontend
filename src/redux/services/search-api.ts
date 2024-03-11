import type { ISearchResult, SearchInputs } from '@/utils/types/search'

import { api } from './api'

export const searchAPI = api.injectEndpoints({
    endpoints: build => ({
        search: build.query<ISearchResult, SearchInputs>({
            query: ({ query }) => `search?query=${query}`,
        }),
    }),
    overrideExisting: false,
})
