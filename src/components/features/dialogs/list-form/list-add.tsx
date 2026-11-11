'use client'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { listAPI } from '@/utils/redux/services/list/list.api'
import { CreateListInputs } from '@/utils/redux/services/list/list.types'

import { ListForm } from './list-form'

export const ListAdd = () => {
    const dialog = useDialog()
    const toast = useToast()

    const [createList] = listAPI.useCreateListMutation()

    const initialValues: CreateListInputs = {
        name: '',
        description: '',
    }
    const handleSubmit = async (inputs: CreateListInputs) => {
        try {
            const trimmedInputs = {
                ...inputs,
                name: inputs.name.trim(),
                description: inputs.description.trim(),
            }
            await createList(trimmedInputs)
            dialog.close()
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
        }
    }

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{'Create list'}</h1>
            <hr className="border-black-70" />
            <ListForm initialValues={initialValues} onSubmit={inputs => handleSubmit(inputs as CreateListInputs)} />
        </div>
    )
}
