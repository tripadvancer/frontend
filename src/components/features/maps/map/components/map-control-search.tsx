'use client'

import { ChangeEvent, useCallback } from 'react'

import { getMapState, setMapBounds, setSearchWhileMoving } from '@/utils/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

export const MapControlSearch = () => {
    const dispatch = useAppDispatch()
    const { pendingBounds, searchWhileMoving } = useAppSelector(getMapState)

    const handleSearchWhileMovingChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setSearchWhileMoving(event.target.checked))
        },
        [dispatch],
    )

    const handleSearch = useCallback(() => {
        if (pendingBounds) {
            dispatch(setMapBounds(pendingBounds))
        }
    }, [dispatch, pendingBounds])

    return (
        <div className="absolute left-2 top-14 z-30 flex flex-col gap-y-1 rounded-lg bg-white p-2 shadow-black">
            <label className="flex cursor-pointer items-center gap-x-2 text-sm">
                <input
                    type="checkbox"
                    checked={searchWhileMoving}
                    onChange={handleSearchWhileMovingChange}
                    className="size-4 accent-blue-active"
                />
                Search while moving
            </label>

            {!searchWhileMoving && pendingBounds && (
                <button
                    type="button"
                    onClick={handleSearch}
                    className="rounded-md px-2 py-1 text-sm text-blue-active hover:bg-black-5"
                >
                    Search this area
                </button>
            )}
        </div>
    )
}
