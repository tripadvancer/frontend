import type { GeoJsonCollection } from '@/utils/types/geo'
import type { CreateListInputs, IList, IListInfo, UpdateListInputs } from '@/utils/types/list'
import type { IPlacePreview } from '@/utils/types/place'

import { api } from './api'
import { placesAPI } from './places-api'
import { visitedAPI } from './visited-api'

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
            async onQueryStarted({ listId, placeId }, { dispatch, queryFulfilled }) {
                // Equivalent to invalidatesTags: { type: 'Lists' }
                const optimisticResultLists = dispatch(
                    listAPI.util.updateQueryData('getLists', undefined, draft => {
                        const list = draft.find(list => list.id === listId)
                        if (list) {
                            list._count.listToPlace += 1
                            list.listToPlace.push({ placeId })
                        }
                    }),
                )

                // Equivalent to invalidatesTags: { type: 'PlacesMeta', id: placeId }
                const optimisticResultPlaceMeta = dispatch(
                    placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                        draft.isSaved = true
                    }),
                )

                // Equivalent to invalidatesTags: { type: 'Visited' }
                const optimisticResultVisited = dispatch(
                    visitedAPI.util.updateQueryData('getVisited', undefined, draft => {
                        const place = draft.features.find(place => place.properties.id === placeId)
                        if (place) {
                            place.properties.isSaved = true
                        }
                    }),
                )

                try {
                    await queryFulfilled
                } catch {
                    optimisticResultPlaceMeta.undo()
                    optimisticResultLists.undo()
                    optimisticResultVisited.undo()
                }
            },
            invalidatesTags: (result, error, { listId }) => [{ type: 'Lists', id: listId }, { type: 'Places' }],
        }),

        unSavePlace: build.mutation<void, { listId: number; placeId: number }>({
            query: ({ listId, placeId }) => ({
                url: `lists/${listId}/places/${placeId}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ listId, placeId }, { dispatch, queryFulfilled }) {
                // Equivalent to invalidatesTags: { type: 'Lists' }
                const optimisticResultLists = dispatch(
                    listAPI.util.updateQueryData('getLists', undefined, draft => {
                        const list = draft.find(list => list.id === listId)
                        if (list) {
                            list._count.listToPlace -= 1
                            list.listToPlace.splice(
                                list.listToPlace.findIndex(item => item.placeId === placeId),
                                1,
                            )
                        }
                    }),
                )

                // Equivalent to invalidatesTags: { type: 'PlacesMeta', id: placeId }
                const optimisticResultPlaceMeta = dispatch(
                    placesAPI.util.updateQueryData('getPlaceMetaById', placeId, draft => {
                        draft.isSaved = false
                    }),
                )

                // Equivalent to invalidatesTags: { type: 'Visited' }
                const optimisticResultVisited = dispatch(
                    visitedAPI.util.updateQueryData('getVisited', undefined, draft => {
                        const place = draft.features.find(place => place.properties.id === placeId)
                        if (place) {
                            place.properties.isSaved = false
                        }
                    }),
                )

                try {
                    await queryFulfilled
                } catch {
                    optimisticResultPlaceMeta.undo()
                    optimisticResultLists.undo()
                    optimisticResultVisited.undo()
                }
            },
            invalidatesTags: (result, error, { listId }) => [{ type: 'Lists', id: listId }, { type: 'Places' }],
        }),
    }),
    overrideExisting: false,
})
