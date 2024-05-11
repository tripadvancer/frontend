'use client'

import type { IList, UpdateListInputs } from '@/utils/types/list'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsForm } from './widget-saved-lists-form'

export const WidgetSavedListsEdit = (list: IList) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()
    const dispatch = useAppDispatch()

    const [updateList, { isLoading }] = listAPI.useUpdateListMutation()

    const initialValues: UpdateListInputs = {
        id: list.id,
        name: list.name,
        description: list.description,
        isPublic: list.isPublic,
    }

    const handleSubmit = async (inputs: UpdateListInputs) => {
        try {
            const updatedList = await updateList(inputs).unwrap()
            console.log(updatedList)
            dispatch(setWidgetActiveList(updatedList))
            dialog.close()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('saved_list_form.edit.title')}</h1>
            <hr className="border-black-70" />
            <WidgetSavedListsForm
                initialValues={initialValues}
                onSubmit={inputs => handleSubmit(inputs as UpdateListInputs)}
            />
        </div>
    )
}
