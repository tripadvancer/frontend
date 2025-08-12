import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { EdgeGeoResponse } from '@/redux/services/internal/internal.types'

export const internalAPI = createApi({
    reducerPath: 'internalAPI',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_INTERNAL_API_URL }),
    endpoints: builder => ({
        getEdgeGeo: builder.query<EdgeGeoResponse, void>({
            query: () => 'edge-geo',
        }),
    }),
})
