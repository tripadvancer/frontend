'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import type { CreatePlaceInputs } from '@/utils/types/place'

import { PlacesNearbyWarning } from '@/components/features/places-nearby-warning/places-nearby-warning'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceForm } from './place-form'

export const PlaceAdd = () => {
    const t = useI18n()
    const dialog = useDialog()
    const router = useRouter()
    const toast = useToast()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()

    const [addPlace, { isLoading }] = placesAPI.useAddPlaceMutation()
    const [searchPlacesAround, { isLoading: isSearchingPlacesAround }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const location = lat && lng ? `${lat}, ${lng}` : ''

    const initialValues: CreatePlaceInputs = {
        title: '',
        description: '',
        location,
        photos: [],
        cover: null,
        categories: [],
    }

    const handleSubmit = async (inputs: CreatePlaceInputs) => {
        const latitude = inputs.location.split(',').map(Number)[0]
        const longitude = inputs.location.split(',').map(Number)[1]

        const response = await searchPlacesAround({
            lat: latitude,
            lng: longitude,
            radius: parseInt(process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS || '15', 10),
            categories: [],
        })

        if (response.data?.length) {
            dialog.open(<PlacesNearbyWarning places={response.data} />)
            return
        }

        try {
            const response = await addPlace(inputs).unwrap()
            dispatch(
                setMapViewState({
                    latitude,
                    longitude,
                }),
            )
            dispatch(
                setMapPlacePopupInfo({
                    id: response.id,
                    title: inputs.title,
                    cover: inputs.cover,
                    countryCode: '',
                    isFavorite: false,
                    isVisited: false,
                    avgRating: 0,
                    reviewsCount: 0,
                    coordinates: [longitude, latitude],
                }),
            )
            toast.success(t('success.create_place'))
            router.push('/maps')
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
