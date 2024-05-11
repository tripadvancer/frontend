import type { GeoJsonCollection } from '@/utils/types/geo'
import type { CreateListInputs, IList, UpdateListInputs, UpdatePlaceInListsInputs } from '@/utils/types/list'
import type { IPlacePreview } from '@/utils/types/place'

import { api } from './api'

export const listAPI = api.injectEndpoints({
    endpoints: build => ({
        getLists: build.query<IList[], void>({
            query: () => 'lists',
            providesTags: ['Lists'],
        }),

        getListPlaces: build.query<GeoJsonCollection<IPlacePreview>, number>({
            query: listId => `lists/${listId}/places`,
            providesTags: (result, error, listId) => [{ type: 'ListPlaces', id: listId }],
        }),

        createList: build.mutation<{ id: number }, CreateListInputs>({
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
            invalidatesTags: (result, error, inputs) => [{ type: 'Lists' }, { type: 'Lists', id: inputs.id }],
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

        updatePlaceInLists: build.mutation<void, UpdatePlaceInListsInputs>({
            query: inputs => ({
                url: 'lists/',
                method: 'PATCH',
                body: inputs,
            }),
            invalidatesTags: (result, error, inputs) => [
                { type: 'Lists' },
                { type: 'Lists', id: inputs.placeId },
                { type: 'Places' },
                { type: 'PlacesMeta' },
                { type: 'Visited' },
            ],
        }),
    }),
    overrideExisting: false,
})
