'use client'

import type { IList } from '@/utils/types/list'

import { ArrowLeftIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import { resetWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'

import { WidgetSavedListsViewPlaces } from './widget-saved-lists-view-places'

export const WidgetSavedListsView = ({ id, name }: IList) => {
    const dispatch = useAppDispatch()

    const handleBackClick = () => {
        dispatch(resetWidgetActiveList())
        dispatch(closeMapPopups())
    }

    return (
        <div className="flex flex-col gap-y-6 sm:gap-y-8">
            <div
                role="back"
                className="hover-animated flex cursor-pointer items-center gap-x-2 overflow-hidden hover:text-blue-active"
                onClick={handleBackClick}
            >
                <div className="flex-none">
                    <ArrowLeftIcon16 />
                </div>
                <div className="overflow-hidden text-ellipsis text-nowrap text-big-bold">{name}</div>
            </div>
            <WidgetSavedListsViewPlaces listId={id} />
        </div>
    )
}
