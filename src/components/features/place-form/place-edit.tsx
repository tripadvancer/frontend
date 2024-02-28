'use client'

import { useRouter } from 'next/navigation'

import type { IPlace, UpdatePlaceInputs } from '@/utils/types/place'

import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceForm } from './place-form'

export const PlaceEdit = (place: IPlace) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()

    const [editPlace, { isLoading }] = placesAPI.useEditPlaceMutation()

    const initialValues: UpdatePlaceInputs = {
        placeId: place.id,
        title: place.title,
        description: place.description,
        location: place.location.coordinates[1] + ', ' + place.location.coordinates[0],
        photos: place.photos.map(photo => photo.url),
        cover: place.cover,
        categories: place.categories,
    }

    const handleSubmit = (inputs: UpdatePlaceInputs) => {
        editPlace(inputs)
            .unwrap()
            .then(() => {
                toast.success(t('success.create_place'))
                router.push(`/places/${place.id}`)
            })
            .catch(() => {
                toast.error(t('common.error'))
            })
    }

    return (
        <PlaceForm
            initialValues={initialValues}
            isLoading={isLoading}
            onSubmit={inputs => handleSubmit(inputs as UpdatePlaceInputs)}
        />
    )
}
