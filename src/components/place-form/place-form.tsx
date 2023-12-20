'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { CreatePlaceInputs, UpdatePlaceInputs } from '@/utils/types/place'

import { Button } from '@/components/forms/button/button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { InputCoordinates } from './components/input-coordinates'
import { InputPlaceCover } from './components/input-place-cover'
import { InputPlaceDescription } from './components/input-place-description'
import { InputPlaceName } from './components/input-place-name'
import { InputPlacePhotos } from './components/input-place-photos'
import { SelectCategories } from './components/select-categories'

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
        validationSchema: Yup.object().shape({}),
        onSubmit,
    })

    const handleSelectCategories = () => {
        dialog.open(<SelectCategories />)
    }

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
                        <InputPlaceName value={formik.values?.title} onChange={formik.handleChange} />
                        <InputCoordinates value={formik.values?.location} onChange={formik.handleChange} />
                        <div className="flex gap-2">
                            <div
                                className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white"
                                onClick={handleSelectCategories}
                            >
                                Категория 1
                            </div>
                            <div className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white">
                                Категория 2
                            </div>
                            <div className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white">
                                Категория 3
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-y-16">
                        <div>
                            <h2 className="mb-8 text-h5-m sm:text-h5">About this place</h2>
                            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                                <div className="w-full text-black-40 lg:w-64">
                                    Tell us what inspired you so you can help others learn more about this place.
                                </div>
                                {/* <InputPlaceDescription
                                    value={formik.values?.description}
                                    onChange={formik.handleChange}
                                /> */}
                            </div>
                        </div>
                        <div>
                            <h2 className="mb-8 text-h5-m sm:text-h5">Photos</h2>
                            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                                <div className="w-full text-black-40 lg:w-64">
                                    You can upload up to 10 photos of the place.
                                </div>
                                <InputPlacePhotos />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:gap-x-8">
                            <div className="flex-1">
                                <Button type="submit" isLoading={isLoading} className="mb-4 w-full">
                                    Add a place
                                </Button>
                                <p className="text-center text-small text-black-40">
                                    By adding a new object to the map, you accept the Terms and Conditions, Privacy
                                    Policy and consent to their processing.
                                </p>
                            </div>
                            <div className="w-full lg:w-64" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
