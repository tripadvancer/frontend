'use client'

import { useState } from 'react'
import { ViewState } from 'react-map-gl'

import { useRouter, useSearchParams } from 'next/navigation'

import type { CreatePlaceInputs, IPlacePreview } from '@/utils/types/place'

import { useToast } from '@/providers/toast-provider'
import { setMapViewState, setPlacePopupInfo } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { createPlace } from '@/services/places'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceForm } from './place-form'

export const AddPlace = () => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState<boolean>(false)

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

    const handleSubmit = async (values: CreatePlaceInputs) => {
        try {
            setIsLoading(true)
            const place = await createPlace(values)
            const latitude = values.location.split(',').map(Number)[0]
            const longitude = values.location.split(',').map(Number)[1]
            const mapViewState: Partial<ViewState> = {
                latitude,
                longitude,
            }
            const placePopupInfo: IPlacePreview = {
                id: place.id,
                title: values.title,
                cover: values.cover,
                isFavorite: false,
                isVisited: false,
                avgRating: 0,
                reviewsCount: 0,
                coordinates: [longitude, latitude],
            }
            dispatch(setMapViewState(mapViewState))
            dispatch(setPlacePopupInfo(placePopupInfo))
            toast.success(t('success.create_place'))
            router.push('/maps')
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
