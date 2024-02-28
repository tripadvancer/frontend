'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import type { UpdatePlaceInputs } from '@/utils/types/place'

import { GlobalLoading } from '@/components/ui/global-loading'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { updatePlaceById } from '@/services/places'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceForm } from './place-form'

export const EditPlace = ({ placeId }: { placeId: string }) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()
    const response = placesAPI.useGetPlaceByIdQuery(parseInt(placeId))

    const [isLoading, setIsLoading] = useState<boolean>(false)

    if (response.isSuccess) {
        const initialValues: UpdatePlaceInputs = {
            placeId: response.data.id,
            title: response.data.title,
            description: response.data.description,
            location: response.data.location.coordinates[1] + ', ' + response.data.location.coordinates[0],
            photos: response.data.photos.map(photo => photo.url),
            cover: response.data.cover,
            categories: response.data.categories,
        }

        const handleSubmit = async (values: UpdatePlaceInputs) => {
            try {
                setIsLoading(true)
                await updatePlaceById(values)
                toast.success(t('success.create_place'))
                router.push(`/places/${response.data.id}`)
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

    return <GlobalLoading />
}
