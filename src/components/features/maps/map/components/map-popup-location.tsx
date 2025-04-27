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
import { closeMapPopups, getMapState } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around.api'
import { LngLatToString } from '@/utils/helpers/maps'

type MapPopupLocationProps = {
    containerRef: RefObject<HTMLDivElement>
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const MapPopupLocation = ({ containerRef, activeUserId, isAuth, isEmailVerified }: MapPopupLocationProps) => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const dialog = useDialog()
    const router = useRouter()
    const popupInfo = useAppSelector(getMapState).locationPopupInfo
    const ref = useRef<HTMLDivElement>(null)

    const [searchPlacesAround, { isLoading }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    // TODO: Consider switching to a different package or waiting for a fix
    // Issue: `useOnClickOutside` does not support a `null` ref
    // More details: https://github.com/juliencrn/usehooks-ts/issues/663
    useOnClickOutside([ref as RefObject<HTMLDivElement>, containerRef], () => {
        dispatch(closeMapPopups())
    })

    if (!popupInfo) {
        return null
    }

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
            ...popupInfo.coordinates,
            radius: parseInt(process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS || '15', 10),
            categories: [],
        })

        if (response.data?.length) {
            dialog.open(<PlacesNearbyWarning places={response.data} />)
            return
        }

        dispatch(closeMapPopups())
        router.push(`/places/add?lat=${popupInfo.coordinates.lat}&lng=${popupInfo.coordinates.lng}`)
    }

    return (
        <>
            <Popup
                latitude={popupInfo.coordinates.lat}
                longitude={popupInfo.coordinates.lng}
                offset={[0, -15] as [number, number]}
                closeOnClick={false}
                closeButton={false}
            >
                <div ref={ref}>
                    <div>{t('map.popup.location.title')}</div>
                    <div className="mb-4 text-small text-black-40">{LngLatToString(popupInfo.coordinates)}</div>
                    <FormButton type="stroke" size="small" isLoading={isLoading} onClick={handleAddPlaceClick}>
                        {t('map.popup.location.addPlace')}
                    </FormButton>
                </div>
            </Popup>
            <Marker
                latitude={popupInfo.coordinates.lat}
                longitude={popupInfo.coordinates.lng}
                offset={[0, -9] as [number, number]}
            >
                <Image src="/images/pin-blue-active.svg" alt="Location marker" width={20} height={20} />
            </Marker>
        </>
    )
}
