'use client'

import { useState } from 'react'

import type { CreatePlaceInputs } from '@/utils/types/place'

import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { createPlace } from '@/services/places'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceForm } from './place-form'

export const AddPlace = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues: CreatePlaceInputs = {
        title: '',
        description: '',
        location: '',
        photos: [],
        cover: '',
        categories: [],
    }

    const handleSubmit = async (values: CreatePlaceInputs) => {
        try {
            setIsLoading(true)
            await createPlace(values)
            toast.success(t('success.create_place'))
            dialog.close()
        } catch (err) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <PlaceForm
            initialValues={initialValues}
            isLoading={isLoading}
            onSubmit={values => handleSubmit(values as CreatePlaceInputs)}
        />
    )
}
