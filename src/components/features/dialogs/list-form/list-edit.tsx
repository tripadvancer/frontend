'use client'

import { useTranslations } from 'next-intl'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { setWidgetActiveList } from '@/utils/redux/features/widget-slice'
import { useAppDispatch } from '@/utils/redux/hooks'
import { listAPI } from '@/utils/redux/services/list/list.api'
import { UpdateListInputs } from '@/utils/redux/services/list/list.types'
import { IList } from '@/utils/types/common'

import { ListForm } from './list-form'

export const ListEdit = (list: IList) => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()
    const dispatch = useAppDispatch()

    const [updateList, { isLoading }] = listAPI.useUpdateListMutation()

    const initialValues: UpdateListInputs = {
        id: list.id,
        name: list.name,
        description: list.description || '',
        isPublic: list.isPublic,
    }

    const handleSubmit = async (inputs: UpdateListInputs) => {
        try {
            const trimmedInputs = {
                ...inputs,
                name: inputs.name.trim(),
                description: inputs.description.trim(),
            }
            const updatedList = await updateList(trimmedInputs).unwrap()
            dispatch(setWidgetActiveList(updatedList))
            dialog.close()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('dialog.listForm.title.edit')}</h1>
            <hr className="border-black-70" />
            <ListForm initialValues={initialValues} onSubmit={inputs => handleSubmit(inputs as UpdateListInputs)} />
        </div>
    )
}
