'use client'

import { RefObject, useRef } from 'react'
import { Marker, Popup } from 'react-map-gl/maplibre'

import { useTranslations } from 'next-intl'
import { useOnClickOutside } from 'usehooks-ts'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { PlacesNearbyWarning } from '@/components/features/dialogs/places-nearby-warning/places-nearby-warning'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { closeMapPopups } from '@/redux/features/map-slice'
import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around.api'
import { LngLatToString } from '@/utils/helpers/maps'
import { LngLat } from '@/utils/types/geo'

type MapPopupLocationProps = {
    mapRef: RefObject<HTMLDivElement>
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
    coordinates: LngLat
}

export const MapPopupLocation = ({
    mapRef,
    activeUserId,
    isAuth,
    isEmailVerified,
    coordinates,
}: MapPopupLocationProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const ref = useRef<HTMLDivElement>(null)

    const [searchPlacesAround, { isLoading }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    useOnClickOutside([ref, mapRef], () => {
        dispatch(closeMapPopups())
    })

    const handleAddPlaceClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        if (isAuth && activeUserId && isEmailVerified === false) {
            dialog.open(<ClaimEmailError />)
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
        router.push(`/places/add?lat=${coordinates.lat}&lng=${coordinates.lng}`)
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
                offset={[0, -15] as [number, number]}
                closeOnClick={false}
                closeButton={false}
            >
                <div ref={ref}>
                    <div>{t('map.popup.location.title')}</div>
                    <div className="mb-4 text-small text-black-40">{LngLatToString(coordinates)}</div>
                    <div className="flex flex-col gap-y-1">
                        <FormButton type="stroke" size="small" onClick={handleIAmHereClick}>
                            {t('map.popup.location.iAmHere')}
                        </FormButton>
                        <FormButton type="stroke" size="small" isLoading={isLoading} onClick={handleAddPlaceClick}>
                            {t('map.popup.location.addPlace')}
                        </FormButton>
                    </div>
                </div>
            </Popup>
            <Marker latitude={coordinates.lat} longitude={coordinates.lng} offset={[0, -9] as [number, number]}>
                <Image src="/images/pin-blue-active.svg" alt="Location marker" width={20} height={20} />
            </Marker>
        </>
    )
}
