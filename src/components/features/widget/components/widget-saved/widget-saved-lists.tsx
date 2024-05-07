'use client'

import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedListsItem } from './widget-saved-lists-item'
import { WidgetSavedListsItemSkeleton } from './widget-saved-lists-item-skeleton'

export const WidgetSavedLists = () => {
    const t = useI18n()
    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && lists.length === 0) {
        return <WidgetMessage message={t('widget.saved.empty_message', { br: <br /> })} />
    }

    if (isSuccess && lists.length > 0) {
        return (
            <div>
                {lists.map(list => (
                    <WidgetSavedListsItem key={`widget-list-${list.id}`} {...list} />
                ))}
                <p className="mt-4 text-center text-black-40 sm:mt-8">{t('widget.saved.lists.info')}</p>
            </div>
        )
    }

    return Array.from({ length: 3 }).map((_, i) => <WidgetSavedListsItemSkeleton key={`widget-list-skeleton-${i}`} />)
}
