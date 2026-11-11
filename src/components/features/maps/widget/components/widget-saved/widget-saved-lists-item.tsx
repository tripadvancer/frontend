'use client'

import { ArrowRightIcon } from 'lucide-react'

import { setWidgetActiveList } from '@/utils/redux/features/widget-slice'
import { useAppDispatch } from '@/utils/redux/hooks'
import { IList } from '@/utils/types/common'

export const WidgetSavedListsItem = (list: IList) => {
    const dispatch = useAppDispatch()

    const handleListClick = () => {
        dispatch(setWidgetActiveList(list))
    }

    return (
        <div
            className="group hover-animated flex cursor-pointer items-center justify-between gap-x-4 border-t border-blue-20 py-3 last-of-type:border-b hover:text-blue-active sm:py-4"
            onClick={handleListClick}
        >
            <div className="flex-1 overflow-hidden">
                <div className="overflow-hidden text-ellipsis text-big-bold">{list.name}</div>
                <div className="flex gap-x-1 text-small text-black-40">
                    {'Private'}
                    <span>•</span>
                    {list._count.listToPlace === 0
                        ? 'No places'
                        : list._count.listToPlace === 1
                          ? '1 place'
                          : list._count.listToPlace + ' places'}
                </div>
            </div>
            <ArrowRightIcon size={16} absoluteStrokeWidth />
        </div>
    )
}
