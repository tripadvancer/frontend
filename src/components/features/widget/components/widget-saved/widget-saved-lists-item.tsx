'use client'

import type { IList } from '@/utils/types/list'

import { ArrowRightIcon16 } from '@/components/ui/icons'
import { setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetSavedListsItem = (list: IList) => {
    const t = useI18n()
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
                <div className="overflow-hidden text-ellipsis text-nowrap text-big-bold">{list.name}</div>
                <div className="flex gap-x-1 text-small text-black-40">
                    {t('widget.saved.lists.private')}
                    <span>•</span>
                    {t('widget.saved.lists.places', { count: list._count.listToPlace })}
                </div>
            </div>
            <ArrowRightIcon16 />
        </div>
    )
}
