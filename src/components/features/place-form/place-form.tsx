'use client'

import { useFormik } from 'formik'

import Image from 'next/image'

import type { CreatePlaceInputs, UpdatePlaceInputs } from '@/utils/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceFormErrorMesage } from './components/place-form-error-mesage'
import { PlaceFormInputCategories } from './components/place-form-input-categories'
import { PlaceFormInputCoordinates } from './components/place-form-input-coordinates'
import { PlaceFormInputCover } from './components/place-form-input-cover'
import { PlaceFormInputDescription } from './components/place-form-input-description'
import { PlaceFormInputTitle } from './components/place-form-input-title'
import { PlaceFormPhotosList } from './components/place-form-photos-list'
import { PlaceFormSubmit } from './components/place-form-submit'
import { validationSchema } from './validation-schema'

type PlaceFormProps = {
    initialValues: CreatePlaceInputs | UpdatePlaceInputs
    isLoading: boolean
    onSubmit: (inputs: CreatePlaceInputs | UpdatePlaceInputs) => void
}

export const PlaceForm = ({ initialValues, isLoading, onSubmit }: PlaceFormProps) => {
    const t = useI18n()

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: validationSchema(t),
        onSubmit,
    })

    return (
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <div className="flex-center relative z-10 -mb-8 flex-[540px] pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    {formik.values.cover && (
                        <Image
                            src={makeImageUrl(formik.values.cover, ImageVariant.PUBLIC)}
                            alt=""
                            fill
                            priority
                            className="object-cover"
                        />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
                </div>
                <section className="container relative z-30 py-8">
                    <div className="flex-center m-auto flex-col gap-y-4 sm:w-2/3">
                        <PlaceFormInputCover
                            value={formik.values.cover}
                            onChange={value => formik.setFieldValue('cover', value)}
                        />
                        <PlaceFormInputTitle
                            value={formik.values.title}
                            onChange={value => formik.setFieldValue('title', value)}
                        />
                        <PlaceFormInputCoordinates
                            value={formik.values.location}
                            onChange={value => formik.setFieldValue('location', value)}
                        />
                        <PlaceFormInputCategories
                            value={formik.values.categories}
                            onChange={value => formik.setFieldValue('categories', value)}
                        />
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-y-16">
                        <PlaceFormInputDescription
                            value={formik.values.description}
                            onChange={value => formik.setFieldValue('description', value)}
                        />
                        <PlaceFormPhotosList
                            photos={formik.values.photos}
                            onChange={value => formik.setFieldValue('photos', value)}
                        />
                        <div className="flex flex-col gap-y-4">
                            <PlaceFormErrorMesage errors={formik.errors} />
                            <PlaceFormSubmit isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
