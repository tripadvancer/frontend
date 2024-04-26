'use client'

import type { IList, UpdateListInputs } from '@/utils/types/list'

import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsForm } from './widget-saved-lists-form'

type WidgetListsEditProps = IList & {
    onClose: () => void
}

export const WidgetSavedListsEdit = ({ onClose, ...list }: WidgetListsEditProps) => {
    const t = useI18n()
    const toast = useToast()

    const [updateList, { isLoading }] = listAPI.useUpdateListMutation()

    const initialValues: UpdateListInputs = {
        id: list.id,
        name: list.name,
        description: list.description,
        isPublic: list.isPublic,
        placesOrder: [],
    }

    const handleSubmit = async (inputs: UpdateListInputs) => {
        try {
            await updateList(inputs)
            onClose()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <WidgetSavedListsForm
            initialValues={initialValues}
            isLoading={isLoading}
            onSubmit={inputs => handleSubmit(inputs as UpdateListInputs)}
            onClose={onClose}
        />
    )
}
