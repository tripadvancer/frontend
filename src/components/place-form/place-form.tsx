'use client'

import { useFormik } from 'formik'

import type { CreatePlaceInputs, UpdatePlaceInputs } from '@/utils/types/place'

import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { DescriptionInput } from './components/description-input'
import { FormSubmit } from './components/form-submit'
import { InputCategories } from './components/input-categories'
import { InputCoordinates } from './components/input-coordinates'
import { InputPlaceCover } from './components/input-place-cover'
import { InputPlaceName } from './components/input-place-name'
import { PlacePhotosList } from './components/place-photos-list'
import { ValidateDialog } from './components/validate-dialog'
import { validationSchema } from './validation-schema'

type PlaceFormProps = {
    initialValues: CreatePlaceInputs | UpdatePlaceInputs
    isLoading: boolean
    onSubmit: (values: CreatePlaceInputs | UpdatePlaceInputs) => Promise<void>
}

export const PlaceForm = ({ initialValues, isLoading, onSubmit }: PlaceFormProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: validationSchema(t),
        validate: () => {
            if (formik.errors) {
                dialog.open(<ValidateDialog />)
            }
        },
        onSubmit,
    })

    return (
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <div className="relative z-10 -mb-8 flex flex-[540px] items-center justify-center pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    {/* {cover && <Image src={src} alt={title} fill priority className="object-cover" />} */}
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
                </div>
                <section className="container relative z-30 py-8">
                    <div className="m-auto flex flex-col items-center justify-center gap-y-4 sm:w-2/3">
                        <InputPlaceCover />
                        {/* <InputPlaceName value={formik.values?.title} onChange={formik.handleChange} /> */}
                        {/* <InputCoordinates value={formik.values?.location} onChange={formik.handleChange} /> */}
                        <InputCategories value={formik.values?.categories} onChange={formik.handleChange} />
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-y-16">
                        <DescriptionInput
                            value={formik.values.description}
                            onChange={value => formik.setFieldValue('description', value)}
                        />
                        <PlacePhotosList
                            photos={formik.values.photos}
                            onChange={value => formik.setFieldValue('photos', value)}
                        />
                        <FormSubmit isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </form>
    )
}
