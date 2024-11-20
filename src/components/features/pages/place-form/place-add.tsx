'use client'

import { useTranslations } from 'next-intl'

import { useRouter, useSearchParams } from 'next/navigation'

import { PlacesNearbyWarning } from '@/components/features/dialogs/places-nearby-warning/places-nearby-warning'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { placesAroundAPI } from '@/redux/services/places-around.api'
import { placesAPI } from '@/redux/services/places.api'
import { CreatePlaceInputs } from '@/redux/services/places.types'
import { stringToLngLat } from '@/utils/helpers/maps'

import { PlaceForm } from './place-form'

export const PlaceAdd = () => {
    const t = useTranslations()
    const dialog = useDialog()
    const router = useRouter()
    const toast = useToast()
    const searchParams = useSearchParams()

    const [createPlace, { isLoading }] = placesAPI.useCreatePlaceMutation()
    const [searchPlacesAround, { isLoading: isSearchingPlacesAround }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const location = lat && lng ? `${lat}, ${lng}` : ''

    const initialValues: CreatePlaceInputs = {
        title: '',
        description: '',
        location,
        photos: [],
        categories: [],
    }

    const handleSubmit = async (inputs: CreatePlaceInputs) => {
        const lngLat = stringToLngLat(inputs.location)

        const response = await searchPlacesAround({
            ...lngLat,
            radius: parseInt(process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS || '15', 10),
            categories: [],
        })

        if (response.data?.length) {
            dialog.open(<PlacesNearbyWarning places={response.data} />)
            return
        }

        try {
            const trimmedInputs = {
                ...inputs,
                title: inputs.title.trim(),
            }
            const response = await createPlace(trimmedInputs).unwrap()
            toast.success(t('success.createPlace'))
            router.push(`/places/${response.id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <PlaceForm
            initialValues={initialValues}
            isLoading={isLoading || isSearchingPlacesAround}
            onSubmit={inputs => handleSubmit(inputs as CreatePlaceInputs)}
        />
    )
}
