'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { validationConfig } from '@/configs/validation.config'
import { CreateListInputs, UpdateListInputs } from '@/utils/redux/services/list/list.types'

const listNameMaxLength = validationConfig.list.name.maxLength
const listDescriptionMaxLength = validationConfig.list.description.maxLength

type ListFormProps = {
    initialValues: CreateListInputs | UpdateListInputs
    isLoading?: boolean
    onSubmit: (values: CreateListInputs | UpdateListInputs) => void
}

export const ListForm = ({ initialValues, isLoading, onSubmit }: ListFormProps) => {
    const dialog = useDialog()

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('This field is required')
            .max(listNameMaxLength, `This field must be at most ${listNameMaxLength} characters long`),
        description: Yup.string()
            .trim()
            .max(listDescriptionMaxLength, `This field must be at most ${listDescriptionMaxLength} characters long`),
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
                        {'Name'}
                    </label>
                    <FormInput
                        id="name"
                        name="name"
                        value={formik.values.name}
                        autoFocus
                        autoComplete="off"
                        placeholder={'Enter list name'}
                        maxLength={listNameMaxLength}
                        error={formik.errors.name}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {'Description'}
                    </label>
                    <FormTextarea
                        id="description"
                        name="description"
                        value={formik.values.description}
                        placeholder={'Enter list description'}
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
                    {'Save'}
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    {'Close'}
                </FormButton>
            </div>
        </form>
    )
}
