'use client'

import { FormikErrors } from 'formik'
import { TriangleAlertIcon } from 'lucide-react'

import { CreatePlaceInputs, UpdatePlaceInputs } from '@/redux/services/places/places.types'
import { getFormikErrors } from '@/utils/helpers/common'

type PlaceFormErrorMessageProps = {
    errors: FormikErrors<CreatePlaceInputs | UpdatePlaceInputs>
}

export const PlaceFormErrorMessage = ({ errors }: PlaceFormErrorMessageProps) => {
    if (getFormikErrors(errors).length === 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-y-2 text-red-100">
            {getFormikErrors(errors).map(error => (
                <div key={`place-form-error-${error}`} className="flex gap-x-2 text-small">
                    <TriangleAlertIcon size={16} />
                    {error}
                </div>
            ))}
        </div>
    )
}
