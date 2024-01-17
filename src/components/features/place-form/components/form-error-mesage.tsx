'use client'

import { useEffect } from 'react'

import { FormikErrors } from 'formik'

import type { CreatePlaceInputs, UpdatePlaceInputs } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type FormErrorMesageProps = {
    errors: FormikErrors<CreatePlaceInputs | UpdatePlaceInputs>
}

export const FormErrorMesage = ({ errors }: FormErrorMesageProps) => {
    const t = useI18n()
    const dialog = useDialog()

    useEffect(() => {
        // console.log(errors)
    }, [errors])

    return (
        <div>
            <div>{errors.title}</div>
            <div>{errors.description}</div>
            <div>{errors.location}</div>
        </div>
        // <div className="w-full sm:w-104">
        //     <div className="mb-8 flex flex-col gap-y-4">
        //         <h1 className="text-h7">Warning</h1>
        //         <hr className="border-black-70" />
        //         <p>To add a place to the map, please correct the following errors:</p>
        //         <ul className="list-outside list-disc space-y-2.5 pl-12">
        //             <li>
        //                 Please enter the title of the place. Please enter the title of the place. Please enter the title
        //                 of the place.
        //             </li>
        //             <li>Please enter the description of the place.</li>
        //             <li>Please enter the location of the place.</li>
        //         </ul>
        //     </div>
        //     <FormButton variant="blue" onClick={() => dialog.close()}>
        //         {t('common.action.close')}
        //     </FormButton>
        // </div>
    )
}
