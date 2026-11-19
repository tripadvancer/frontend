'use client'

import { FormButton } from '@/components/ui/form-button'
import { listAPI } from '@/utils/redux/services/list/list.api'
import { IList } from '@/utils/types/common'

import { SavedListsItem } from './saved-lists-item'
import { SavedListsItemSkeleton } from './saved-lists-item-skeleton'

export const SavedLists = ({ onSelect }: { onSelect: (list: IList) => void }) => {
    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    if (isError) {
        return (
            <section className="mx-auto flex flex-col items-center justify-center gap-y-4">
                <p className="text-black-40 text-center">
                    An unexpected error has occurred.
                    <br />
                    Please try again later.
                </p>
                <FormButton type="stroke" size="small" shape="rounded" isLoading={isLoading} onClick={refetch}>
                    Try again
                </FormButton>
            </section>
        )
    }

    if (isSuccess && lists.length === 0) {
        return (
            <p className="text-black-40 text-center">
                You have not saved places.
                <br />
                Create a new list and start adding places to it.
            </p>
        )
    }

    if (isSuccess && lists.length > 0) {
        return (
            <div>
                {lists.map(list => (
                    <SavedListsItem key={`saved-list-${list.id}`} list={list} onSelect={onSelect} />
                ))}
                <p className="text-black-40 mt-6 text-center sm:mt-8">Select a list to view saved places.</p>
            </div>
        )
    }

    return <SavedListsItemSkeleton />
}
