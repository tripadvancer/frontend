'use client'

import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { CreatePlaceInputs } from '@/utils/types/place'

import { useToast } from '@/providers/toast-provider'
import { setViewState } from '@/redux/features/map-slice'
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
            await createPlace(values)
            toast.success(t('success.create_place'))
            const mapViewState = {
                latitude: values.location.split(',').map(Number)[0],
                longitude: values.location.split(',').map(Number)[1],
            }
            dispatch(setViewState(mapViewState))
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
