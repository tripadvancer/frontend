'use client'

import { useEffect, useRef, useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { CreateListInputs, IList, UpdatePlaceInListsInputs } from '@/utils/types/list'

import { FormButton } from '@/components/ui/form-button'
import { FormCheckbox } from '@/components/ui/form-checkbox'
import { FormInput } from '@/components/ui/form-input'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

type SavePlaceFormProps = {
    lists: IList[]
    placeId: number
}

const listNameMinLength = validationConfig.list.name.minLength
const listNameMaxLength = validationConfig.list.name.maxLength

export const SavePlaceListsForm = ({ lists, placeId }: SavePlaceFormProps) => {
    const t = useI18n()
    const toast = useToast()
    const dialog = useDialog()

    const inputRef = useRef<HTMLInputElement>(null)

    const [isCreateList, setIsCreateList] = useState<boolean>(lists.length === 0)

    const [createList, { isLoading: isListCreating }] = listAPI.useCreateUserListMutation()
    const [updatePlaceInLists, { isLoading: isPlaceUpdating }] = listAPI.useUpdatePlaceInListsMutation()

    useEffect(() => {
        if (isCreateList) {
            inputRef.current?.focus()
        }
    }, [isCreateList])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(listNameMinLength, t('validation.text.min_length', { min_length: listNameMinLength }))
            .max(listNameMaxLength, t('validation.text.max_length', { max_length: listNameMaxLength })),
    })

    const initialValues: UpdatePlaceInListsInputs & CreateListInputs = {
        placeId,
        listIds: lists
            .filter(list => list.listToPlace.some(listToPlace => listToPlace.placeId === placeId))
            .map(list => list.id),
        name: '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit: async (inputs: UpdatePlaceInListsInputs & CreateListInputs) => {
            if (inputs.name) {
                try {
                    const response = await createList({ name: inputs.name }).unwrap()
                    await updatePlaceInLists({ placeId, listIds: [...inputs.listIds, response.id] }).unwrap()
                    dialog.close()
                } catch {
                    toast.error(t('common.error'))
                }

                return
            }

            try {
                await updatePlaceInLists({ placeId, listIds: inputs.listIds }).unwrap()
                dialog.close()
            } catch {
                toast.error(t('common.error'))
            }
        },
    })

    return (
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                    {lists.map(list => (
                        <FormCheckbox
                            key={`list-${list.id}`}
                            id={`list-${list.id}`}
                            name="listIds"
                            value={list.id.toString()}
                            caption={list.name}
                            checked={formik.values.listIds.includes(list.id)}
                            disabled={isListCreating || isPlaceUpdating}
                            onChange={e =>
                                formik.setFieldValue(
                                    'listIds',
                                    e.target.checked
                                        ? [...formik.values.listIds, list.id]
                                        : formik.values.listIds.filter(id => id !== list.id),
                                )
                            }
                        />
                    ))}
                </div>
                <FormCheckbox
                    id="new-list"
                    name="new-list"
                    value="new-list"
                    caption={t('save_place.add_new_list')}
                    checked={isCreateList}
                    disabled={isListCreating || isPlaceUpdating}
                    onChange={() => setIsCreateList(!isCreateList)}
                />
                <FormInput
                    ref={inputRef}
                    type="text"
                    name="name"
                    value={formik.values.name}
                    autoFocus={isCreateList}
                    autoComplete="off"
                    placeholder={t('save_place.add_new_list.input.plceholder')}
                    error={formik.errors.name}
                    disabled={!isCreateList || isListCreating || isPlaceUpdating}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex gap-x-2">
                <FormButton htmlType="submit" isLoading={isListCreating || isPlaceUpdating} isDisabled={!formik.dirty}>
                    {t('common.action.save')}
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    {t('common.action.cancel')}
                </FormButton>
            </div>
        </form>
    )
}
