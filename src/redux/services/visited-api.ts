import type { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlacePreview } from '@/utils/types/place'

import { apiSliceWithCredentials } from './api'

export const visitedAPI = apiSliceWithCredentials.injectEndpoints({
    endpoints: build => ({
        getVisited: build.query<GeoJsonCollection<IPlacePreview>, void>({
            query: () => 'visited',
            providesTags: ['Visited'],
        }),
    }),
    overrideExisting: false,
})
