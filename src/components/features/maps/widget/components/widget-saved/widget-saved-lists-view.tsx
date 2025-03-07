'use client'

import { ArrowLeftIcon, FilterIcon, FilterXIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ListEdit } from '@/components/features/dialogs/list-form/list-edit'
import { Confirmation } from '@/components/ui/confirmation'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { getIsFilterMapBySavedLists, setIsFilterMapBySavedLists } from '@/redux/features/map-slice'
import { setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list.api'
import { useMapRoute } from '@/utils/hooks/use-map-route'
import { IList } from '@/utils/types/common'

import { WidgetSavedListsViewPlacesFeed } from './widget-saved-lists-view-places-feed'

export const WidgetSavedListsView = (list: IList) => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()
    const isFilterMapBySavedLists = useAppSelector(getIsFilterMapBySavedLists)
    const dispatch = useAppDispatch()

    const { clearRoute } = useMapRoute()

    const [deleteList] = listAPI.useDeleteListMutation()

    const handleBackClick = () => {
        dispatch(setWidgetActiveList(null))
        clearRoute()
    }

    const handleDeleteClick = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirmation.deleteList.title')}
                message={t('confirmation.deleteList.text')}
                onConfirm={async () => {
                    try {
                        await deleteList(list.id)
                        dispatch(setWidgetActiveList(null))
                        dialog.close()
                    } catch {
                        toast.error(t('common.error'))
                    }
                }}
            />,
        )
    }

    const items: DropdownItemProps[] = [
        {
            caption: isFilterMapBySavedLists
                ? t('map.widget.tabs.savedPlaces.lists.action.disableMapFilter')
                : t('map.widget.tabs.savedPlaces.lists.action.enableMapFilter'),
            value: 'preview_mode',
            icon: isFilterMapBySavedLists ? <FilterXIcon size={16} /> : <FilterIcon size={16} />,
            onClick: () => dispatch(setIsFilterMapBySavedLists(!isFilterMapBySavedLists)),
        },
        {
            caption: t('map.widget.tabs.savedPlaces.lists.action.edit'),
            value: 'edit',
            icon: <PencilIcon size={16} />,
            onClick: () => dialog.open(<ListEdit {...list} />),
        },
        {
            caption: t('map.widget.tabs.savedPlaces.lists.action.delete'),
            value: 'delete',
            icon: <TrashIcon size={16} />,
            isRed: true,
            onClick: handleDeleteClick,
        },
    ]

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex-center justify-between gap-x-8">
                <div
                    role="back"
                    className="hover-animated relative cursor-pointer overflow-hidden pl-6 hover:text-blue-active"
                    onClick={handleBackClick}
                >
                    <div className="absolute left-0 top-1">
                        <ArrowLeftIcon size={16} absoluteStrokeWidth />
                    </div>
                    <div className="overflow-hidden text-ellipsis text-big-bold">{list.name}</div>
                </div>
                <Dropdown items={items} />
            </div>
            {list.description && <div className="break-words text-black-70">{list.description}</div>}
            <WidgetSavedListsViewPlacesFeed listId={list.id} />
        </div>
    )
}
