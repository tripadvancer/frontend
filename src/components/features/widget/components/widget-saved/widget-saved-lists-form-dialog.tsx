'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { UpdateListInputs } from '@/utils/types/list'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

const listNameMaxLength = validationConfig.list.name.maxLength
const listDescriptionMaxLength = validationConfig.list.description.maxLength

type WidgetSavedListsFormProps = {
    initialValues: UpdateListInputs
    isLoading?: boolean
    onSubmit: (values: UpdateListInputs) => void
}

export const WidgetSavedListsForm = ({ initialValues, isLoading, onSubmit }: WidgetSavedListsFormProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required(t('validation.required'))
            .max(listNameMaxLength, t('validation.text.max_length', { max_length: listNameMaxLength })),
        description: Yup.string()
            .trim()
            .max(listDescriptionMaxLength, t('validation.text.max_length', { max_length: listDescriptionMaxLength })),
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
                        Name
                    </label>
                    <FormInput
                        id="name"
                        name="name"
                        value={formik.values.name}
                        placeholder={t('placeholder.action.review')}
                        maxLength={listNameMaxLength}
                        error={formik.errors.name}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        Description
                    </label>
                    <FormTextarea
                        id="description"
                        name="description"
                        value={formik.values.description}
                        placeholder={t('placeholder.action.review')}
                        maxLength={listDescriptionMaxLength}
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
