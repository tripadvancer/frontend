'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'

import { CreatePlaceInputs, UpdatePlaceInputs } from '@/redux/services/places.types'

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

    const handlePhotosChange = (value: { url: string; isCover: boolean }[]) => {
        formik.setFieldValue('photos', value)
    }

    return (
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <div className="container space-y-8 py-16 sm:space-y-16">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="font-bold">Add a new place</div>
                        <PlaceFormInputTitle
                            value={formik.values.title}
                            onChange={value => formik.setFieldValue('title', value)}
                        />
                        <PlaceFormInputLocation
                            value={formik.values.location}
                            onChange={value => formik.setFieldValue('location', value)}
                        />
                    </div>

                    <PlaceFormInputCategories
                        value={formik.values.categories}
                        onChange={value => formik.setFieldValue('categories', value)}
                    />
                </div>

                <div className="flex flex-col gap-y-16">
                    <PlaceFormInputPhotos
                        initialPhotos={formik.initialValues.photos}
                        setIsFormDisabled={setIsFormDisabled}
                        onChange={handlePhotosChange}
                    />
                    <PlaceFormInputDescription
                        value={formik.values.description}
                        error={formik.errors.description}
                        onChange={value => formik.setFieldValue('description', value)}
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
        </form>
    )
}
