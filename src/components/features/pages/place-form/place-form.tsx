'use client'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'

import Image from 'next/image'

import { CreatePlaceInputs, UpdatePlaceInputs } from '@/redux/services/places.types'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

import { PlaceFormErrorMesage } from './components/place-form-error-mesage'
import { PlaceFormInputCategories } from './components/place-form-input-categories'
import { PlaceFormInputDescription } from './components/place-form-input-description'
import { PlaceFormInputLocation } from './components/place-form-input-location'
import { PlaceFormInputTitle } from './components/place-form-input-title'
import { PlaceFormSubmit } from './components/place-form-submit'
import { PlaceFormInputPhotos } from './components/place-from-input-photo/place-from-input-photos'
import { validationSchema } from './validation-schema'

type PlaceFormProps = {
    initialValues: CreatePlaceInputs | UpdatePlaceInputs
    isLoading: boolean
    onSubmit: (inputs: CreatePlaceInputs | UpdatePlaceInputs) => void
}

export const PlaceForm = ({ initialValues, isLoading, onSubmit }: PlaceFormProps) => {
    const t = useTranslations()

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: validationSchema(t),
        onSubmit,
    })

    const renderCover = () => {
        const cover = formik.values.photos.find(photo => photo.isCover)

        if (!cover) {
            return null
        }

        return (
            <Image
                src={makeImageUrl(cover.url, ImageVariants.PUBLIC)}
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
            <div className="flex-center relative z-10 -mb-8 flex-[540px] pb-8">
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
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-y-16">
                        <PlaceFormInputDescription
                            value={formik.values.description}
                            onChange={value => formik.setFieldValue('description', value)}
                        />
                        <PlaceFormInputPhotos
                            initialPhotos={formik.initialValues.photos}
                            onChange={handlePhotosChange}
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
