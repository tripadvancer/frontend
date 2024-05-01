'use client'

import { Marker, Popup } from 'react-map-gl/maplibre'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { ILocationPopupInfo } from '@/utils/types/map'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { PlacesNearbyWarning } from '@/components/features/places-nearby-warning/places-nearby-warning'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { closeMapPopups } from '@/redux/features/map-slice'
import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { LngLatToString } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

type MapPopupLocationProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
    coordinates: ILocationPopupInfo['coordinates']
}

export const MapPopupLocation = ({ activeUserId, isAuth, isEmailVerified, coordinates }: MapPopupLocationProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [searchPlacesAround, { isLoading }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    const handleAddPlaceClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        if (isAuth && activeUserId && isEmailVerified === false) {
            dialog.open(<ClaimEmailError userId={activeUserId} />)
            return
        }

        const response = await searchPlacesAround({
            ...coordinates,
            radius: parseInt(process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS || '15', 10),
            categories: [],
        })

        if (response.data?.length) {
            dialog.open(<PlacesNearbyWarning places={response.data} />)
            return
        }

        dispatch(closeMapPopups())
        router.push(`/add-place?lat=${coordinates.lat}&lng=${coordinates.lng}`)
    }

    const handleIAmHereClick = () => {
        dispatch(closeMapPopups())
        dispatch(setUserLocation(coordinates))
    }

    return (
        <>
            <Popup
                latitude={coordinates.lat}
                longitude={coordinates.lng}
                offset={[0, -5] as [number, number]}
                closeOnClick={false}
                closeButton={false}
            >
                <div>{t('map.popup.location.title')}</div>
                <div className="mb-4 text-small text-black-40">{LngLatToString(coordinates)}</div>
                <div className="flex flex-col gap-y-1">
                    <FormButton type="stroke" size="small" onClick={handleIAmHereClick}>
                        {t('map.popup.location.i_am_here')}
                    </FormButton>
                    <FormButton type="stroke" size="small" isLoading={isLoading} onClick={handleAddPlaceClick}>
                        {t('map.popup.location.add_place')}
                    </FormButton>
                </div>
            </Popup>
            <Marker latitude={coordinates.lat} longitude={coordinates.lng}>
                <Image src="/images/pin-blue-active.svg" alt="Location marker" width={20} height={20} />
            </Marker>
        </>
    )
}
