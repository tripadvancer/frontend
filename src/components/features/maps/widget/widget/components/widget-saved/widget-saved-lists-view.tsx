'use client'

import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ListEdit } from '@/components/features/dialogs/list-form/list-edit'
import { Confirmation } from '@/components/ui/confirmation'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list.api'
import { IList } from '@/utils/types/common'

import { WidgetSavedListsViewPlacesFeed } from './widget-saved-lists-view-places-feed'

export const WidgetSavedListsView = (list: IList) => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()
    const dispatch = useAppDispatch()

    const [deleteList] = listAPI.useDeleteListMutation()

    const handleBackClick = () => {
        dispatch(setWidgetActiveList(null))
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
