import type { GeoJsonCollection } from '@/utils/types/geo'
import type { CreateListInputs, IList, IListInfo, UpdateListInputs } from '@/utils/types/list'
import type { IPlacePreview } from '@/utils/types/place'

import { api } from './api'

export const listAPI = api.injectEndpoints({
    endpoints: build => ({
        getLists: build.query<IList[], void>({
            query: () => 'lists',
            providesTags: ['Lists'],
        }),

        getListInfo: build.query<IListInfo, number>({
            query: listId => `lists/${listId}`,
            providesTags: (result, error, listId) => [{ type: 'Lists', id: listId }],
        }),

        getListPlaces: build.query<GeoJsonCollection<IPlacePreview>, number>({
            query: listId => `lists/${listId}/places`,
            providesTags: (result, error, listId) => [{ type: 'Lists', id: listId }],
        }),

        createUserList: build.mutation<{ id: number }, CreateListInputs>({
            query: inputs => ({
                url: 'lists',
                method: 'POST',
                body: inputs,
            }),
            invalidatesTags: ['Lists'],
        }),

        updateList: build.mutation<void, UpdateListInputs>({
            query: inputs => ({
                url: `lists/${inputs.id}`,
                method: 'PATCH',
                body: inputs,
            }),
            invalidatesTags: ['Lists'],
        }),

        deleteList: build.mutation<void, number>({
            query: listId => ({
                url: `lists/${listId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, listId) => [
                { type: 'Lists' },
                { type: 'Lists', id: listId },
                { type: 'Places' },
                { type: 'PlacesMeta' },
                { type: 'Visited' },
            ],
        }),

        savePlace: build.mutation<void, { listId: number; placeId: number }>({
            query: ({ listId, placeId }) => ({
                url: `lists/${listId}/places`,
                method: 'POST',
                body: { placeId },
            }),
            invalidatesTags: (result, error, { listId, placeId }) => [
                { type: 'Lists' },
                { type: 'Lists', id: listId },
                { type: 'Places' },
                { type: 'PlacesMeta', id: placeId },
                { type: 'Visited' },
            ],
        }),

        unSavePlace: build.mutation<void, { listId: number; placeId: number }>({
            query: ({ listId, placeId }) => ({
                url: `lists/${listId}/places/${placeId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { listId, placeId }) => [
                { type: 'Lists' },
                { type: 'Lists', id: listId },
                { type: 'Places' },
                { type: 'PlacesMeta', id: placeId },
                { type: 'Visited' },
            ],
        }),
    }),
    overrideExisting: false,
})
