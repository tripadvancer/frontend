'use client'

import { listAPI } from '@/redux/services/list-api'

import { SavePlaceListsItem } from './save-place-lists-item'

export const SavePlaceLists = ({ placeId }: { placeId: number }) => {
    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    if (isError) {
        return (
            <div className="text-center text-black-40">
                An unexpected error has occurred.
                <br />
                Please try again later.
            </div>
        )
    }

    if (isSuccess && lists.length === 0) {
        return (
            <div className="text-center text-black-40">
                Your saved places are empty.
                <br />
                Create a new list and start adding places to it.
            </div>
        )
    }

    if (isSuccess && lists.length > 0) {
        return (
            <div>
                {lists?.map(list => <SavePlaceListsItem key={`list-${list.id}`} list={list} placeId={placeId} />)}
            </div>
        )
    }

    return <div>Loading ...</div>
}
