'use client'

import { MouseEvent, useState } from 'react'

import type { IList } from '@/utils/types/list'

import { Confirmation } from '@/components/ui/confirmation'
import { ArrowRightIcon16, DeleteIcon16, EditIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { closeMapPopups } from '@/redux/features/map-slice'
import { setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsEdit } from './widget-saved-lists-edit'

export const WidgetSavedListsItem = (list: IList) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()
    const dispatch = useAppDispatch()

    const [formIsVisible, setFormIsVisible] = useState(false)
    const [deleteList] = listAPI.useDeleteListMutation()

    useKeypress(Keys.ESCAPE, () => {
        setFormIsVisible(false)
    })

    const handleDeleteClick = (e: MouseEvent<HTMLDivElement>) => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirm.delete_list.title')}
                message={t('confirm.delete_list.message')}
                onConfirm={async () => {
                    try {
                        await deleteList(list.id)
                        toast.success(t('success.delete_list'))
                        dialog.close()
                    } catch {
                        toast.error(t('common.error'))
                    }
                }}
            />,
        )

        e.stopPropagation()
    }

    const handleEditClick = (e: MouseEvent<HTMLDivElement>) => {
        setFormIsVisible(true)
        e.stopPropagation()
    }

    const handleListClick = () => {
        dispatch(setWidgetActiveList(list.id))
        dispatch(closeMapPopups())
    }

    if (formIsVisible) {
        return <WidgetSavedListsEdit {...list} onClose={() => setFormIsVisible(false)} />
    }

    return (
        <div
            className="group hover-animated flex cursor-pointer items-center justify-between gap-x-4 border-t border-blue-20 py-2 text-big-bold last-of-type:border-b hover:text-blue-active sm:py-4"
            onClick={handleListClick}
        >
            <div className="flex-1 overflow-hidden text-ellipsis text-nowrap">{list.name}</div>
            <div className="flex flex-none items-center gap-x-2">
                <div className="text-red-100 group-hover:block sm:hidden" onClick={handleDeleteClick}>
                    <DeleteIcon16 />
                </div>
                <div className="text-blue-100 group-hover:block sm:hidden" onClick={handleEditClick}>
                    <EditIcon16 />
                </div>
                <ArrowRightIcon16 />
            </div>
        </div>
    )
}
