'use client'

import { listAPI } from '@/utils/redux/services/list/list.api'

import { SavePlaceListsForm } from './save-place-lists-form'

export const SavePlaceLists = ({ placeId }: { placeId: number }) => {
    const { data: lists, isError, isSuccess } = listAPI.useGetListsQuery()

    if (isError) {
        return (
            <div className="text-center text-black-40">An unexpected error has occurred. Please try again later.</div>
        )
    }

    if (isSuccess && lists) {
        return <SavePlaceListsForm lists={lists} placeId={placeId} />
    }

    return <div>Loading ...</div>
}
