'use client'

import { FormikErrors } from 'formik'

import { AlertIcon16 } from '@/components/ui/icons'
import { getFormikErrors } from '@/utils/helpers/common'
import { CreatePlaceInputs, UpdatePlaceInputs } from '@/utils/types/place'

type PlaceFormErrorMesageProps = {
    errors: FormikErrors<CreatePlaceInputs | UpdatePlaceInputs>
}

export const PlaceFormErrorMesage = ({ errors }: PlaceFormErrorMesageProps) => {
    return (
        <div className="flex flex-col gap-y-2 text-red-100">
            {getFormikErrors(errors).map(error => (
                <div key={`place-form-error-${error}`} className="flex gap-x-2 text-small">
                    <AlertIcon16 />
                    {error}
                </div>
            ))}
        </div>
    )
}
