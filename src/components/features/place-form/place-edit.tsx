'use client'

import { useRouter } from 'next/navigation'

import type { IPlace, UpdatePlaceInputs } from '@/utils/types/place'

import { PlacesNearbyWarning } from '@/components/features/places-nearby-warning/places-nearby-warning'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceForm } from './place-form'

export const PlaceEdit = (place: IPlace) => {
    const t = useI18n()
    const dialog = useDialog()
    const router = useRouter()
    const toast = useToast()

    const [editPlace, { isLoading }] = placesAPI.useEditPlaceMutation()
    const [searchPlacesAround, { isLoading: isSearchingPlacesAround }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    const initialValues: UpdatePlaceInputs = {
        placeId: place.id,
        title: place.title,
        description: place.description,
        location: place.location.coordinates[1] + ', ' + place.location.coordinates[0],
        photos: place.photos.map(photo => photo.url),
        cover: place.cover,
        categories: place.categories,
    }

    const handleSubmit = async (inputs: UpdatePlaceInputs) => {
        const response = await searchPlacesAround({
            lat: inputs.location.split(',').map(Number)[0],
            lng: inputs.location.split(',').map(Number)[1],
            radius: parseInt(process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS || '15', 10),
            categories: [],
        })

        if (response.data && response.data.length > 0 && !response.data.map(place => place.id).includes(place.id)) {
            dialog.open(<PlacesNearbyWarning places={response.data} />)
            return
        }

        try {
            await editPlace(inputs)
            toast.success(t('success.create_place'))
            router.push(`/places/${place.id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <PlaceForm
            initialValues={initialValues}
            isLoading={isLoading}
            onSubmit={inputs => handleSubmit(inputs as UpdatePlaceInputs)}
        />
    )
}
