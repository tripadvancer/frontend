import type { GeoJsonCollection } from '@/utils/types/geo'
import type { IPlacePreview } from '@/utils/types/place'

import { api } from './api'

export const visitedAPI = api.injectEndpoints({
    endpoints: build => ({
        getVisited: build.query<GeoJsonCollection<IPlacePreview>, void>({
            query: () => 'visited',
            providesTags: ['Visited'],
        }),
    }),
    overrideExisting: false,
})
