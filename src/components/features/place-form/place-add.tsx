'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import type { CreatePlaceInputs } from '@/utils/types/place'

import { useToast } from '@/providers/toast-provider'
import { setMapViewState, setPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceForm } from './place-form'

export const PlaceAdd = () => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()

    const [addPlace, { isLoading }] = placesAPI.useAddPlaceMutation()

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
        try {
            const response = await addPlace(inputs).unwrap()
            const latitude = inputs.location.split(',').map(Number)[0]
            const longitude = inputs.location.split(',').map(Number)[1]
            dispatch(
                setMapViewState({
                    latitude,
                    longitude,
                }),
            )
            dispatch(
                setPlacePopupInfo({
                    id: response.id,
                    title: inputs.title,
                    cover: inputs.cover,
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
            isLoading={isLoading}
            onSubmit={inputs => handleSubmit(inputs as CreatePlaceInputs)}
        />
    )
}
