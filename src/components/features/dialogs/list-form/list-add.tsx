'use client'

import { useTranslations } from 'next-intl'

import type { CreateListInputs } from '@/utils/types/list'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list-api'

import { ListForm } from './list-form'

export const ListAdd = () => {
    const t = useTranslations()
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
            <h1 className="h7">{t('dialog.listForm.title.add')}</h1>
            <hr className="border-black-70" />
            <ListForm initialValues={initialValues} onSubmit={inputs => handleSubmit(inputs as CreateListInputs)} />
        </div>
    )
}
