'use client'

import { useEffect, useRef, useState } from 'react'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import * as Yup from 'yup'

import { FormButton } from '@/components/ui/form-button'
import { FormCheckbox } from '@/components/ui/form-checkbox'
import { FormInput } from '@/components/ui/form-input'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { listAPI } from '@/redux/services/list.api'
import { CreateListInputs, UpdatePlaceInListsInputs } from '@/redux/services/list.types'
import { IList } from '@/utils/types/common'

type SavePlaceFormProps = {
    lists: IList[]
    placeId: number
}

const listNameMaxLength = validationConfig.list.name.maxLength

export const SavePlaceListsForm = ({ lists, placeId }: SavePlaceFormProps) => {
    const t = useTranslations()
    const toast = useToast()
    const dialog = useDialog()

    const inputRef = useRef<HTMLInputElement>(null)

    const [isCreateList, setIsCreateList] = useState<boolean>(lists.length === 0)

    const [createList, { isLoading: isListCreating }] = listAPI.useCreateListMutation()
    const [updatePlaceInLists, { isLoading: isPlaceUpdating }] = listAPI.useUpdatePlaceInListsMutation()

    useEffect(() => {
        if (isCreateList) {
            inputRef.current?.focus()
        }
    }, [isCreateList])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .max(listNameMaxLength, t('validation.text.maxLength', { maxLength: listNameMaxLength })),
    })

    const initialValues: CreateListInputs & UpdatePlaceInListsInputs = {
        placeId,
        listIds: lists
            .filter(list => list.listToPlace.some(listToPlace => listToPlace.placeId === placeId))
            .map(list => list.id),
        name: '',
        description: '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit: async (inputs: CreateListInputs & UpdatePlaceInListsInputs) => {
            if (inputs.name) {
                try {
                    const trimmedInputs = {
                        name: inputs.name.trim(),
                        description: inputs.description.trim(),
                    }
                    const response = await createList(trimmedInputs).unwrap()
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
                            label={list.name}
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
                    label={t('dialog.savePlace.field.list.label')}
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
                    maxLength={listNameMaxLength}
                    placeholder={t('dialog.savePlace.field.list.placeholder')}
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
