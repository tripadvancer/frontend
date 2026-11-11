'use client'

import { SavePlaceLists } from './save-place-lists'

export const SavePlace = ({ placeId }: { placeId: number }) => {
    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{'Save place to list'}</h1>
            <hr className="border-black-70" />
            <SavePlaceLists placeId={placeId} />
        </div>
    )
}
