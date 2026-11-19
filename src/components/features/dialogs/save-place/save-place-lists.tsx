'use client'

import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { listAPI } from '@/utils/redux/services/list/list.api'

import { SavePlaceListsForm } from './save-place-lists-form'

export const SavePlaceLists = ({ placeId }: { placeId: number }) => {
    const { data: lists, isError, isSuccess } = listAPI.useGetListsQuery()

    if (isError) {
        return <div className="text-black-40 text-center">{UNEXPECTED_ERROR_MESSAGE}</div>
    }

    if (isSuccess && lists) {
        return <SavePlaceListsForm lists={lists} placeId={placeId} />
    }

    return <div>Loading ...</div>
}
