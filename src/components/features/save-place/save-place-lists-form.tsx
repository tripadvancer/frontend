'use client'

import { useEffect, useRef, useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { IList, UpdateListsByPlaceIdInputs } from '@/utils/types/list'

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

    const [isCreateList, setIsCreateList] = useState<boolean>(lists.length === 0)

    const [createList, { isLoading: isListCreating }] = listAPI.useCreateUserListMutation()

    const validationSchema = Yup.object().shape({
        newList: Yup.object().shape({
            name: Yup.string()
                .trim()
                .min(listNameMinLength, t('validation.text.min_length', { min_length: listNameMinLength }))
                .max(listNameMaxLength, t('validation.text.max_length', { max_length: listNameMaxLength })),
        }),
    })

    const initialValues: UpdateListsByPlaceIdInputs = {
        placeId,
        listIds: lists
            .filter(list => list.listToPlace.some(listToPlace => listToPlace.placeId === placeId))
            .map(list => list.id.toString()),
    }

    const formik = useFormik({
        initialValues: initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit: async (inputs: UpdateListsByPlaceIdInputs) => {
            if (inputs.newList && inputs.newList.name) {
                try {
                    const response = await createList(inputs.newList).unwrap()
                    console.log([...inputs.listIds, response.id.toString()])
                    // dialog.close()
                } catch {
                    toast.error(t('common.error'))
                }
            } else {
                console.log(inputs.listIds)
                // dialog.close()
            }
        },
    })

    return (
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-2">
                {lists.length === 0 ? (
                    <div className="text-black-40">{t('save_place.lists.empty', { br: <br /> })}</div>
                ) : (
                    <div className="flex flex-col gap-y-2">
                        {lists.map(list => (
                            <FormCheckbox
                                key={`list-${list.id}`}
                                id={`list-${list.id}`}
                                name="listIds"
                                value={list.id.toString()}
                                caption={list.name}
                                checked={formik.values.listIds.includes(list.id.toString())}
                                onChange={formik.handleChange}
                            />
                        ))}
                    </div>
                )}
                <FormCheckbox
                    id="new-list"
                    name="new-list"
                    value="new-list"
                    caption={t('save_place.add_new_list')}
                    checked={isCreateList}
                    onChange={() => setIsCreateList(!isCreateList)}
                />
                <FormInput
                    type="text"
                    name="name"
                    value={formik.values.newList?.name || ''}
                    autoFocus={isCreateList}
                    placeholder={t('save_place.add_new_list.input.plceholder')}
                    error={formik.errors.newList?.name}
                    isDisabled={!isCreateList}
                    onChange={e => formik.setFieldValue('newList.name', e.target.value)}
                />
            </div>
            <div className="flex gap-x-2">
                <FormButton htmlType="submit" isLoading={isListCreating} isDisabled={!formik.dirty}>
                    {t('common.action.save')}
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    {t('common.action.cancel')}
                </FormButton>
            </div>
        </form>
    )
}
