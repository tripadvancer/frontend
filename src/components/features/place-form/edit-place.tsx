'use client'

import { useState } from 'react'

import { revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'

import { IPlace, UpdatePlaceInputs } from '@/utils/types/place'

import { useToast } from '@/providers/toast-provider'
import { updatePlaceById } from '@/services/places'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceForm } from './place-form'

type EditPlaceProps = IPlace

export const EditPlace = (place: EditPlaceProps) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues: UpdatePlaceInputs = {
        placeId: place.id,
        title: place.title,
        description: place.description,
        location: place.location.coordinates[1] + ', ' + place.location.coordinates[0],
        photos: place.photos.map(photo => photo.url),
        cover: place.cover,
        categories: place.categories,
    }

    const handleSubmit = async (values: UpdatePlaceInputs) => {
        try {
            setIsLoading(true)
            await updatePlaceById(values)
            toast.success(t('success.create_place'))
            router.push(`/places/${place.id}`)
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
            onSubmit={values => handleSubmit(values as UpdatePlaceInputs)}
        />
    )
}
