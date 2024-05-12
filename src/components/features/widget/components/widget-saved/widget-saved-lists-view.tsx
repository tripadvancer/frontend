'use client'

import type { IList } from '@/utils/types/list'

import { Confirmation } from '@/components/ui/confirmation'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { ArrowLeftIcon16, DeleteIcon16, EditIcon16, VisibilityIcon16, VisibilityOffIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { getIsFilterMapBySavedLists, setIsFilterMapBySavedLists } from '@/redux/features/map-slice'
import { setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsEdit } from './widget-saved-lists-edit'
import { WidgetSavedListsViewPlacesFeed } from './widget-saved-lists-view-places-feed'

export const WidgetSavedListsView = (list: IList) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()
    const isFilterMapBySavedLists = useAppSelector(getIsFilterMapBySavedLists)
    const dispatch = useAppDispatch()

    const [deleteList] = listAPI.useDeleteListMutation()

    const handleBackClick = () => {
        dispatch(setWidgetActiveList(null))
    }

    const handleDeleteClick = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirm.delete_list.title')}
                message={t('confirm.delete_list.message')}
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
                ? t('widget.saved.lists.disable_map_filter')
                : t('widget.saved.lists.enable_map_filter'),
            value: 'preview_mode',
            icon: isFilterMapBySavedLists ? <VisibilityIcon16 /> : <VisibilityOffIcon16 />,
            onClick: () => dispatch(setIsFilterMapBySavedLists(!isFilterMapBySavedLists)),
        },
        {
            caption: 'Edit',
            value: 'edit',
            icon: <EditIcon16 />,
            onClick: () => dialog.open(<WidgetSavedListsEdit {...list} />),
        },
        {
            caption: 'Delete',
            value: 'delete',
            icon: <DeleteIcon16 />,
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
                        <ArrowLeftIcon16 />
                    </div>
                    <div className="overflow-hidden text-ellipsis text-big-bold">{list.name}</div>
                </div>
                <Dropdown items={items} />
            </div>
            {list.description && <div className="text-black-70">{list.description}</div>}
            <WidgetSavedListsViewPlacesFeed listId={list.id} />
        </div>
    )
}
