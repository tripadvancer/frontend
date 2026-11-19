'use client'

import { useRouter } from 'next/navigation'

import { PlacesNearbyWarning } from '@/components/features/dialogs/places-nearby-warning/places-nearby-warning'
import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { GlobalLoading } from '@/components/ui/global-loading'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { arrayToString, stringToLngLat } from '@/utils/helpers/maps'
import { getPlacePath } from '@/utils/helpers/places'
import { placesAroundAPI } from '@/utils/redux/services/places-around/places-around.api'
import { placesAPI } from '@/utils/redux/services/places/places.api'
import { UpdatePlaceInputs } from '@/utils/redux/services/places/places.types'
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
    const settings = useAppSettings()
    const dialog = useDialog()
    const router = useRouter()
    const toast = useToast()

    const [updatePlace, { isLoading }] = placesAPI.useUpdatePlaceMutation()
    const [searchPlacesAround, { isLoading: isSearchingPlacesAround }] = placesAroundAPI.useLazyGetPlacesAroundQuery()
    const { data: meta, isLoading: isMetaLoading, isError: isMetaError } = placesAPI.useGetPlaceMetaByIdQuery(id)

    if (!settings) {
        return <GlobalLoading />
    }

    if (isMetaLoading) {
        return <GlobalLoading />
    }

    if (isMetaError) {
        return <div>{UNEXPECTED_ERROR_MESSAGE}</div>
    }

    const initialValues: UpdatePlaceInputs = {
        placeId: id,
        title,
        description,
        location: arrayToString(location.coordinates),
        photos: photos.map(photo => ({ url: photo.url, isCover: cover === photo.url })),
        categories,
        isVisited: meta?.isVisited ?? false,
    }

    const handleSubmit = async (inputs: UpdatePlaceInputs) => {
        const lngLat = stringToLngLat(inputs.location)
        const response = await searchPlacesAround({
            ...lngLat,
            radius: settings.radii.uniquePlace,
            categories: [],
        })

        // exclude the current place from the response
        const placeNearby = response.data?.filter(p => p.id !== id) || []

        if (placeNearby.length > 0) {
            dialog.open(<PlacesNearbyWarning places={placeNearby} />)
            return
        }

        try {
            const trimmedInputs = {
                ...inputs,
                title: inputs.title.trim(),
            }
            const response = await updatePlace(trimmedInputs).unwrap()
            toast.success('Your place has been updated.')
            router.push(getPlacePath(response.id, response.countryCode))
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
        }
    }

    return (
        <div className="container space-y-4 py-16">
            <div className="font-bold">Edit place</div>
            <PlaceForm
                initialValues={initialValues}
                isLoading={isLoading || isSearchingPlacesAround}

                onSubmit={inputs => handleSubmit(inputs as UpdatePlaceInputs)}
            />
        </div>
    )
}
