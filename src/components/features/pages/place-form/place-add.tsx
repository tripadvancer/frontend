'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { PlacesNearbyWarning } from '@/components/features/dialogs/places-nearby-warning/places-nearby-warning'
import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { GlobalLoading } from '@/components/ui/global-loading'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { stringToLngLat } from '@/utils/helpers/maps'
import { getPlacePath } from '@/utils/helpers/places'
import { placesAroundAPI } from '@/utils/redux/services/places-around/places-around.api'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { CreatePlaceInputs } from '@/utils/redux/services/places/places.types'

import { PlaceForm } from './place-form'

export const PlaceAdd = () => {
    const settings = useAppSettings()
    const dialog = useDialog()
    const router = useRouter()
    const toast = useToast()
    const searchParams = useSearchParams()

    const [createPlace, { isLoading }] = placesAPI.useCreatePlaceMutation()
    const [searchPlacesAround, { isLoading: isSearchingPlacesAround }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    if (!settings) {
        return <GlobalLoading />
    }

    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const location = lat && lng ? `${lat}, ${lng}` : ''

    const initialValues: CreatePlaceInputs = {
        title: '',
        description: '',
        location,
        photos: [],
        categories: [],
        isVisited: true,
    }

    const handleSubmit = async (inputs: CreatePlaceInputs) => {
        const lngLat = stringToLngLat(inputs.location)

        const response = await searchPlacesAround({
            ...lngLat,
            radius: settings.radii.uniquePlace,
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
            toast.success('Your place has been added.')
            router.push(getPlacePath(response.id, response.countryCode))
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
        }
    }

    return (
        <div className="container space-y-4 py-16">
            <div className="font-bold">Add a new place</div>
            <PlaceForm
                initialValues={initialValues}
                isLoading={isLoading || isSearchingPlacesAround}
                onSubmit={inputs => handleSubmit(inputs as CreatePlaceInputs)}
            />
        </div>
    )
}
