'use client'

import { listAPI } from '@/utils/redux/services/list/list.api'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedListsItem } from './widget-saved-lists-item'
import { WidgetSavedListsItemSkeleton } from './widget-saved-lists-item-skeleton'

export const WidgetSavedLists = () => {
    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && lists.length === 0) {
        return (
            <WidgetMessage
                message={
                    <>
                        You have not saved places.
                        <br />
                        Create a new list and start adding places to it.
                    </>
                }
            />
        )
    }

    if (isSuccess && lists.length > 0) {
        return (
            <div>
                {lists.map(list => (
                    <WidgetSavedListsItem key={`widget-list-${list.id}`} {...list} />
                ))}
                <p className="mt-6 text-center text-black-40 sm:mt-8">{'Select a list to view saved places.'}</p>
            </div>
        )
    }

    return <WidgetSavedListsItemSkeleton />
}
