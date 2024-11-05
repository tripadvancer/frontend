'use client'

import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import { PlacesNearbyWarning } from '@/components/features/dialogs/places-nearby-warning/places-nearby-warning'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAroundAPI } from '@/redux/services/places-around.api'
import { placesAPI } from '@/redux/services/places.api'
import { UpdatePlaceInputs } from '@/redux/services/places.types'
import { arrayToString, stringToLngLat } from '@/utils/helpers/maps'
import { GeoJsonPoint } from '@/utils/types/geo'

import { PlaceForm } from './place-form'

type PlaceEditProps = {
    id: number
    title: string
    description: string
    location: GeoJsonPoint
    photos: { id: number; url: string }[]
    cover: string | null
    categories: number[]
}

export const PlaceEdit = ({ id, title, description, location, photos, cover, categories }: PlaceEditProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const router = useRouter()
    const toast = useToast()

    const [updatePlace, { isLoading }] = placesAPI.useUpdatePlaceMutation()
    const [searchPlacesAround, { isLoading: isSearchingPlacesAround }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    const initialValues: UpdatePlaceInputs = {
        placeId: id,
        title,
        description,
        location: arrayToString(location.coordinates),
        photos: photos.map(photo => photo.url),
        cover,
        categories,
    }

    const handleSubmit = async (inputs: UpdatePlaceInputs) => {
        const lngLat = stringToLngLat(inputs.location)
        const response = await searchPlacesAround({
            ...lngLat,
            radius: parseInt(process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS || '15', 10),
            categories: [],
        })

        // exclude the current place from the response
        const placeNearby = response.data?.filter(p => p.id !== id) || []

        if (placeNearby.length > 0) {
            dialog.open(<PlacesNearbyWarning places={placeNearby} />)
            return
        }

        try {
            await updatePlace(inputs)
            toast.success(t('success.updatePlace'))
            router.push(`/places/${id}`)
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
