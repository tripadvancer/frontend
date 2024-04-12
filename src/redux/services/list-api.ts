import type { CreateListInputs, IList, IListInfo, UpdateListInputs } from '@/utils/types/list'

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
            invalidatesTags: ['Lists'],
        }),
    }),
    overrideExisting: false,
})
