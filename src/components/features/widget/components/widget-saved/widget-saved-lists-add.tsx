'use client'

import { useState } from 'react'

import type { CreateListInputs } from '@/utils/types/list'

import { FormButton } from '@/components/ui/form-button'
import { PlusIcon16 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list-api'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsForm } from './widget-saved-lists-form'

export const WidgetSavedListsAdd = () => {
    const t = useI18n()
    const toast = useToast()

    const [isVisible, setIsVisible] = useState(false)
    const [createList, { isLoading }] = listAPI.useCreateUserListMutation()

    const initialValues: CreateListInputs = {
        name: '',
        description: 'test description',
    }

    useKeypress(Keys.ESCAPE, () => {
        setIsVisible(false)
    })

    const handleSubmit = async (inputs: CreateListInputs) => {
        try {
            await createList(inputs)
            setIsVisible(false)
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <>
            <FormButton
                type="stroke"
                size="small"
                shape="rounded"
                icon={<PlusIcon16 />}
                className="mb-4 w-full sm:mb-8"
                isDisabled={isVisible}
                isLoading={isLoading}
                onClick={() => setIsVisible(true)}
            >
                {t('widget.saved.lists.add_button')}
            </FormButton>

            {isVisible && (
                <WidgetSavedListsForm
                    initialValues={initialValues}
                    isLoading={isLoading}
                    onSubmit={inputs => handleSubmit(inputs as CreateListInputs)}
                    onClose={() => setIsVisible(false)}
                />
            )}
        </>
    )
}
