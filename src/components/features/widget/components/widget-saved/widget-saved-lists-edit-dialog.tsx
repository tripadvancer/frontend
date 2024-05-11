'use client'

import type { IList, UpdateListInputs } from '@/utils/types/list'

import { useDialog } from '@/providers/dialog-provider'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsForm } from './widget-saved-lists-form-dialog'

export const WidgetSavedListsEdit = (list: IList) => {
    const t = useI18n()
    const dialog = useDialog()

    const [updateList] = listAPI.useUpdateListMutation()

    const initialValues: UpdateListInputs = {
        id: list.id,
        name: list.name,
        description: list.description,
        isPublic: list.isPublic,
    }

    const handleSubmit = (inputs: UpdateListInputs) => {
        updateList(inputs)
        dialog.close()
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">Edit list</h1>
            <hr className="border-black-70" />
            <WidgetSavedListsForm
                initialValues={initialValues}
                onSubmit={inputs => handleSubmit(inputs as UpdateListInputs)}
            />
        </div>
    )
}
