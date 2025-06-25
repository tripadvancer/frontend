'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'

import Image from 'next/image'

import { CreatePlaceInputs, UpdatePlaceInputs } from '@/redux/services/places.types'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

import { PlaceFormErrorMessage } from './components/place-form-error-message'
import { PlaceFormInputCategories } from './components/place-form-input-categories'
import { PlaceFormInputDescription } from './components/place-form-input-description'
import { PlaceFormInputLocation } from './components/place-form-input-location'
import { PlaceFormInputTitle } from './components/place-form-input-title'
import { PlaceFormSubmit } from './components/place-form-submit'
import { PlaceFormToggleIsVisited } from './components/place-form-toggle-is-visited'
import { PlaceFormInputPhotos } from './components/place-from-input-photos/place-from-input-photos'
import { validationSchema } from './validation-schema'

type PlaceFormProps = {
    initialValues: CreatePlaceInputs | UpdatePlaceInputs
    isLoading: boolean
    onSubmit: (inputs: CreatePlaceInputs | UpdatePlaceInputs) => void
}

export const PlaceForm = ({ initialValues, isLoading, onSubmit }: PlaceFormProps) => {
    const t = useTranslations()
    const [isFormDisabled, setIsFormDisabled] = useState(false)

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: validationSchema(t),
        onSubmit,
    })

    const renderCover = () => {
        const cover = formik.values.photos.find(photo => photo.isCover)

        return (
            <Image
                src={cover ? makeImageUrl(cover.url, ImageVariants.PUBLIC) : '/images/place-cover-placeholder.jpg'}
                alt={formik.values.title}
                fill
                priority
                className="object-cover"
            />
        )
    }

    const handlePhotosChange = (value: { url: string; isCover: boolean }[]) => {
        formik.setFieldValue('photos', value)
    }

    return (
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <div className="flex-center relative z-10 flex-[540px] pb-7">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    {renderCover()}
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-50" />
                </div>
                <section className="container relative z-30 py-8">
                    <div className="flex-center m-auto flex-col gap-y-4 sm:w-2/3">
                        <PlaceFormInputTitle
                            value={formik.values.title}
                            onChange={value => formik.setFieldValue('title', value)}
                        />
                        <PlaceFormInputLocation
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
            <div className="flex-1 bg-white">
                <div className="container py-24">
                    <div className="flex flex-col gap-y-16">
                        <PlaceFormInputDescription
                            value={formik.values.description}
                            onChange={value => formik.setFieldValue('description', value)}
                        />
                        <PlaceFormInputPhotos
                            initialPhotos={formik.initialValues.photos}
                            setIsFormDisabled={setIsFormDisabled}
                            onChange={handlePhotosChange}
                        />
                        <PlaceFormToggleIsVisited
                            isVisited={formik.values.isVisited}
                            onChange={value => formik.setFieldValue('isVisited', value)}
                        />
                        <div className="flex flex-col gap-y-4">
                            <PlaceFormErrorMessage errors={formik.errors} />
                            <PlaceFormSubmit isLoading={isLoading} isDisabled={!formik.dirty || isFormDisabled} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
