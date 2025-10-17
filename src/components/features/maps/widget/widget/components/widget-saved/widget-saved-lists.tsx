'use client'

import { useTranslations } from 'next-intl'

import { WidgetMessage } from '@/components/features/maps/widget/components/widget-message'
import { listAPI } from '@/redux/services/list.api'

import { WidgetSavedListsItem } from './widget-saved-lists-item'
import { WidgetSavedListsItemSkeleton } from './widget-saved-lists-item-skeleton'

export const WidgetSavedLists = () => {
    const t = useTranslations()
    const { data: lists, isError, isLoading, isSuccess, refetch } = listAPI.useGetListsQuery()

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && lists.length === 0) {
        return <WidgetMessage message={t.rich('map.widget.tabs.savedPlaces.emptyMessage', { br: () => <br /> })} />
    }

    if (isSuccess && lists.length > 0) {
        return (
            <div>
                {lists.map(list => (
                    <WidgetSavedListsItem key={`widget-list-${list.id}`} {...list} />
                ))}
                <p className="mt-6 text-center text-black-40 sm:mt-8">{t('map.widget.tabs.savedPlaces.lists.info')}</p>
            </div>
        )
    }

    return <WidgetSavedListsItemSkeleton />
}
