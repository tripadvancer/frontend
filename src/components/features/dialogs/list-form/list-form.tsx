'use client'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import * as Yup from 'yup'

import type { CreateListInputs, UpdateListInputs } from '@/utils/types/list'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'

const listNameMaxLength = validationConfig.list.name.maxLength
const listDescriptionMaxLength = validationConfig.list.description.maxLength

type ListFormProps = {
    initialValues: CreateListInputs | UpdateListInputs
    isLoading?: boolean
    onSubmit: (values: CreateListInputs | UpdateListInputs) => void
}

export const ListForm = ({ initialValues, isLoading, onSubmit }: ListFormProps) => {
    const t = useTranslations()
    const dialog = useDialog()

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required(t('validation.required'))
            .max(listNameMaxLength, t('validation.text.maxLength', { max_length: listNameMaxLength })),
        description: Yup.string()
            .trim()
            .max(listDescriptionMaxLength, t('validation.text.maxLength', { max_length: listDescriptionMaxLength })),
    })

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit,
    })

    return (
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('dialog.listForm.field.name.label')}
                    </label>
                    <FormInput
                        id="name"
                        name="name"
                        value={formik.values.name}
                        autoFocus
                        autoComplete="off"
                        placeholder={t('dialog.listForm.field.name.placeholder')}
                        maxLength={listNameMaxLength}
                        error={formik.errors.name}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('dialog.listForm.field.description.label')}
                    </label>
                    <FormTextarea
                        id="description"
                        name="description"
                        value={formik.values.description}
                        placeholder={t('dialog.listForm.field.description.placeholder')}
                        maxLength={listDescriptionMaxLength}
                        style={{ height: '60px' }}
                        error={formik.errors.description}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="flex gap-x-2">
                <FormButton htmlType="submit" isLoading={isLoading} isDisabled={!formik.dirty}>
                    {t('common.action.send')}
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    {t('common.action.close')}
                </FormButton>
            </div>
        </form>
    )
}
