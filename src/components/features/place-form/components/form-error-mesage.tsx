'use client'

import type { FormikErrors } from 'formik'

import type { CreatePlaceInputs, UpdatePlaceInputs } from '@/utils/types/place'

type FormErrorMesageProps = {
    errors: FormikErrors<CreatePlaceInputs | UpdatePlaceInputs>
}

export const FormErrorMesage = ({ errors }: FormErrorMesageProps) => (
    <div>
        <div>{errors.title}</div>
        <div>{errors.description}</div>
        <div>{errors.location}</div>
    </div>
)
