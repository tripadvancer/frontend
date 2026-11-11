'use client'

import { ArrowLeftIcon, FilterIcon, FilterXIcon, PencilIcon, TrashIcon } from 'lucide-react'

import { ListEdit } from '@/components/features/dialogs/list-form/list-edit'
import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { getIsFilterMapBySavedLists, setIsFilterMapBySavedLists } from '@/utils/redux/features/map-slice'
import { setWidgetActiveList } from '@/utils/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'
import { listAPI } from '@/utils/redux/services/list/list.api'
import { IList } from '@/utils/types/common'

import { WidgetSavedListsViewPlacesFeed } from './widget-saved-lists-view-places-feed'

export const WidgetSavedListsView = (list: IList) => {
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
                title="Delete list"
                message="Are you sure you want to delete this list? This action is irreversible."
                onConfirm={async () => {
                    try {
                        await deleteList(list.id)
                        dispatch(setWidgetActiveList(null))
                        dialog.close()
                    } catch {
                        toast.error('An unexpected error has occurred. Please try again later.')
                    }
                }}
            />,
        )
    }

    const items: DropdownItemProps[] = [
        {
            caption: isFilterMapBySavedLists ? 'Show all places' : 'Hide other places',
            value: 'preview_mode',
            icon: isFilterMapBySavedLists ? <FilterXIcon size={16} /> : <FilterIcon size={16} />,
            onClick: () => dispatch(setIsFilterMapBySavedLists(!isFilterMapBySavedLists)),
        },
        {
            caption: 'Edit',
            value: 'edit',
            icon: <PencilIcon size={16} />,
            onClick: () => dialog.open(<ListEdit {...list} />),
        },
        {
            caption: 'Delete',
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
