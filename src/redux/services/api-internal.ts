import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { EdgeGeo } from '@/utils/types/edge-geo'

export const internalApi = createApi({
    reducerPath: 'internalApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_INTERNAL_API_URL }),
    endpoints: builder => ({
        getEdgeGeo: builder.query<EdgeGeo, void>({
            query: () => 'edge-geo',
        }),
    }),
})
