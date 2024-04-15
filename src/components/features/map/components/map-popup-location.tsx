'use client'

import { Marker, Popup } from 'react-map-gl'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { ILocationPopupInfo } from '@/utils/types/map'

import { PlacesNearbyWarning } from '@/components/features/places-nearby-warning/places-nearby-warning'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { closeMapPopups } from '@/redux/features/map-slice'
import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSessionValidation } from '@/utils/hooks/use-session-validation'
import { useI18n } from '@/utils/i18n/i18n.client'

export const MapPopupLocation = ({ coordinates }: ILocationPopupInfo) => {
    const t = useI18n()
    const dialog = useDialog()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(coordinates)

    const [searchPlacesAround, { isLoading }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    const handleAddPlaceClick = useSessionValidation(async () => {
        const response = await searchPlacesAround({
            ...lngLat,
            radius: parseInt(process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS || '15', 10),
            categories: [],
        })

        if (response.data?.length) {
            dialog.open(<PlacesNearbyWarning places={response.data} />)
            return
        }

        dispatch(closeMapPopups())
        router.push(`/add-place?lat=${lngLat.lat}&lng=${lngLat.lng}`)
    })

    const handleIAmHereClick = () => {
        dispatch(closeMapPopups())
        dispatch(setUserLocation(lngLat))
    }

    return (
        <>
            <Popup
                latitude={lngLat.lat}
                longitude={lngLat.lng}
                offset={[0, -5] as [number, number]}
                closeOnClick={false}
                closeButton={false}
            >
                <div>{t('map.popup.location.title')}</div>
                <div className="mb-4 text-small text-black-40">
                    {lngLat.lat}, {lngLat.lng}
                </div>
                <div className="flex flex-col gap-y-1">
                    <FormButton type="stroke" size="small" onClick={handleIAmHereClick}>
                        {t('map.popup.location.i_am_here')}
                    </FormButton>
                    <FormButton type="stroke" size="small" isLoading={isLoading} onClick={handleAddPlaceClick}>
                        {t('map.popup.location.add_place')}
                    </FormButton>
                </div>
            </Popup>
            <Marker latitude={lngLat.lat} longitude={lngLat.lng}>
                <Image src="/images/pin-blue-active.svg" alt="Location marker" width={20} height={20} />
            </Marker>
        </>
    )
}
