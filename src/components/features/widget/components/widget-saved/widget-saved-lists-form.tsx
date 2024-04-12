'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { CreateListInputs, UpdateListInputs } from '@/utils/types/list'

import { CloseIcon16 } from '@/components/ui/icons'
import { validationConfig } from '@/configs/validation.config'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetSavedListsFormProps = {
    initialValues: CreateListInputs | UpdateListInputs
    isLoading: boolean
    onSubmit: (inputs: CreateListInputs | UpdateListInputs) => void
    onClose: () => void
}

const listNameMinLength = validationConfig.list.name.minLength
const listNameMaxLength = validationConfig.list.name.maxLength

export const WidgetSavedListsForm = ({ initialValues, isLoading, onSubmit, onClose }: WidgetSavedListsFormProps) => {
    const t = useI18n()

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(listNameMinLength, t('validation.text.min_length', { min_length: listNameMinLength }))
            .max(listNameMaxLength, t('validation.text.max_length', { max_length: listNameMaxLength })),
    })

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit,
    })

    return (
        <div className="border-t border-blue-20 py-2 last-of-type:border-b sm:py-4 last-of-type:[&:not(:last-child)]:mb-4 sm:last-of-type:[&:not(:last-child)]:mb-8">
            <form
                className="relative flex w-full items-center justify-between gap-x-4 text-big-bold"
                onSubmit={formik.handleSubmit}
            >
                <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    autoFocus
                    maxLength={listNameMaxLength}
                    className="peer w-full bg-white focus:outline-none disabled:opacity-50"
                    placeholder={t('placeholder.action.list_name')}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
                <div
                    className="hover-animated cursor-pointer text-black-15 hover:text-blue-active peer-disabled:pointer-events-none"
                    onClick={onClose}
                >
                    <CloseIcon16 />
                </div>
            </form>
        </div>
    )
}
