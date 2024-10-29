'use client'

import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import { PlacesNearbyWarning } from '@/components/features/dialogs/places-nearby-warning/places-nearby-warning'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { placesAPI } from '@/redux/services/places.api'
import { UpdatePlaceInputs } from '@/redux/services/places.types'
import { arrayToString, stringToLngLat } from '@/utils/helpers/maps'
import { IPlace } from '@/utils/types/place'

import { PlaceForm } from './place-form'

export const PlaceEdit = (place: IPlace) => {
    const t = useTranslations()
    const dialog = useDialog()
    const router = useRouter()
    const toast = useToast()

    const [updatePlace, { isLoading }] = placesAPI.useUpdatePlaceMutation()
    const [searchPlacesAround, { isLoading: isSearchingPlacesAround }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    const initialValues: UpdatePlaceInputs = {
        placeId: place.id,
        title: place.title,
        description: place.description,
        location: arrayToString(place.location.coordinates),
        photos: place.photos.map(photo => photo.url),
        cover: place.cover,
        categories: place.categories,
    }

    const handleSubmit = async (inputs: UpdatePlaceInputs) => {
        const lngLat = stringToLngLat(inputs.location)
        const response = await searchPlacesAround({
            ...lngLat,
            radius: parseInt(process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS || '15', 10),
            categories: [],
        })

        // exclude the current place from the response
        const placeNearby = response.data?.filter(p => p.id !== place.id) || []

        if (placeNearby.length > 0) {
            dialog.open(<PlacesNearbyWarning places={placeNearby} />)
            return
        }

        try {
            await updatePlace(inputs)
            toast.success(t('success.updatePlace'))
            router.push(`/places/${place.id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <PlaceForm
            initialValues={initialValues}
            isLoading={isLoading || isSearchingPlacesAround}
            onSubmit={inputs => handleSubmit(inputs as UpdatePlaceInputs)}
        />
    )
}
