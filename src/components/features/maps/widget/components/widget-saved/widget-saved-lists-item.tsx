'use client'

import { useTranslations } from 'next-intl'

import { ArrowRightIcon16 } from '@/components/ui/icons'
import { setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { IList } from '@/utils/types/common'

export const WidgetSavedListsItem = (list: IList) => {
    const t = useTranslations()
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
                    {t('map.widget.tabs.savedPlaces.lists.private')}
                    <span>•</span>
                    {t('common.placesCounter', { count: list._count.listToPlace })}
                </div>
            </div>
            <ArrowRightIcon16 />
        </div>
    )
}
