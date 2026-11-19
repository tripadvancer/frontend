import { api } from '@/utils/redux/services/api'
import {
    CreateListInputs,
    GetListPlaces,
    GetListsResponse,
    UpdateListInputs,
    UpdateListResponse,
    UpdatePlaceInListsInputs,
} from '@/utils/redux/services/list/list.types'

export const listAPI = api.injectEndpoints({
    endpoints: build => ({
        getLists: build.query<GetListsResponse, void>({
            query: () => 'lists',
            providesTags: ['Lists'],
        }),

        getListPlaces: build.query<GetListPlaces, { listId: number; selectedCategories: number[] }>({
            query: ({ listId, selectedCategories }) => ({
                url: `lists/${listId}/places`,
                params: {
                    categories_ids: selectedCategories.join(),
                },
            }),
            providesTags: (result, error, { listId }) => [{ type: 'Lists', id: listId }],
        }),

        createList: build.mutation<{ id: number }, CreateListInputs>({
            query: inputs => ({
                url: 'lists',
                method: 'POST',
                body: inputs,
            }),
            invalidatesTags: ['Lists'],
        }),

        updateList: build.mutation<UpdateListResponse, UpdateListInputs>({
            query: ({ id, ...body }) => ({
                url: `lists/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Lists'],
        }),

        deleteList: build.mutation<void, number>({
            query: listId => ({
                url: `lists/${listId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Lists', 'Places', 'PlaceMeta'],
        }),

        updatePlaceInLists: build.mutation<void, UpdatePlaceInListsInputs>({
            query: inputs => ({
                url: 'lists',
                method: 'PATCH',
                body: inputs,
            }),
            invalidatesTags: ['Lists', 'Places', 'PlaceMeta'],
        }),
    }),
    overrideExisting: false,
})
