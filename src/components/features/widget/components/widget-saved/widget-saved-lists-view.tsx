'use client'

import { MouseEvent } from 'react'

import type { IList } from '@/utils/types/list'

import { Confirmation } from '@/components/ui/confirmation'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { ArrowLeftIcon16, DeleteIcon16, ShareIcon16, VisibilityOffIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { resetWidgetActiveList, setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsViewPlaces } from './widget-saved-lists-view-places'

export const WidgetSavedListsView = ({ id, name }: IList) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()
    const dispatch = useAppDispatch()

    const [deleteList] = listAPI.useDeleteListMutation()

    const handleBackClick = () => {
        dispatch(resetWidgetActiveList())
    }

    const handleDeleteClick = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirm.delete_list.title', { list_name: name })}
                message={t('confirm.delete_list.message')}
                onConfirm={async () => {
                    try {
                        await deleteList(id)
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
            caption: 'Disable preview mode',
            value: 'edit',
            icon: <VisibilityOffIcon16 />,
            onClick: () => {},
        },
        {
            caption: 'Share',
            value: 'edit',
            icon: <ShareIcon16 />,
            onClick: () => {},
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
                    className="hover-animated flex cursor-pointer items-center gap-x-2 overflow-hidden hover:text-blue-active"
                    onClick={handleBackClick}
                >
                    <div className="flex-none">
                        <ArrowLeftIcon16 />
                    </div>
                    <div className="overflow-hidden text-ellipsis text-nowrap text-big-bold">{name}</div>
                </div>
                <Dropdown items={items} />
            </div>
            <WidgetSavedListsViewPlaces listId={id} />
        </div>
    )
}
