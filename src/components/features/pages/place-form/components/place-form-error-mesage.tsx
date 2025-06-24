'use client'

import { FormikErrors } from 'formik'
import { TriangleAlertIcon } from 'lucide-react'

import { CreatePlaceInputs, UpdatePlaceInputs } from '@/redux/services/places.types'
import { getFormikErrors } from '@/utils/helpers/common'

type PlaceFormErrorMesageProps = {
    errors: FormikErrors<CreatePlaceInputs | UpdatePlaceInputs>
}

export const PlaceFormErrorMesage = ({ errors }: PlaceFormErrorMesageProps) => {
    if (getFormikErrors(errors).length === 0) {
        return null
    }

    return (
        <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <div className="flex-1 space-y-2 rounded-lg bg-red-10 p-4 text-red-100">
                {getFormikErrors(errors).map(error => (
                    <div key={`place-form-error-${error}`} className="flex gap-x-2">
                        <TriangleAlertIcon size={16} />
                        {error}
                    </div>
                ))}
            </div>
            <div className="hidden w-64 lg:block" />
        </div>
    )
}
