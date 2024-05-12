'use client'

import type { CreateListInputs, IList, UpdateListInputs } from '@/utils/types/list'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsForm } from './widget-saved-lists-form'

export const WidgetSavedListsAdd = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const [createList] = listAPI.useCreateListMutation()

    const initialValues: CreateListInputs = {
        name: '',
        description: '',
    }
    const handleSubmit = async (inputs: CreateListInputs) => {
        try {
            await createList(inputs)
            dialog.close()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('saved_list_form.add.title')}</h1>
            <hr className="border-black-70" />
            <WidgetSavedListsForm
                initialValues={initialValues}
                onSubmit={inputs => handleSubmit(inputs as CreateListInputs)}
            />
        </div>
    )
}
