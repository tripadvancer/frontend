'use client'

import { RefObject, useRef } from 'react'
import { Marker, Popup } from 'react-map-gl/maplibre'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { PlacesNearbyWarning } from '@/components/features/dialogs/places-nearby-warning/places-nearby-warning'
import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { FormButton } from '@/components/ui/form-button'
import { LngLatToString } from '@/utils/helpers/maps'
import { useClickOutside } from '@/utils/hooks/use-click-outside'
import { closeMapPopups, getMapState } from '@/utils/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'
import { placesAroundAPI } from '@/utils/redux/services/places-around/places-around.api'

type MapPopupLocationProps = {
    containerRef: RefObject<HTMLDivElement>
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const MapPopupLocation = ({ containerRef, activeUserId, isAuth, isEmailVerified }: MapPopupLocationProps) => {
    const settings = useAppSettings()
    const dispatch = useAppDispatch()
    const dialog = useDialog()
    const router = useRouter()
    const popupInfo = useAppSelector(getMapState).locationPopupInfo
    const ref = useRef<HTMLDivElement>(null)

    const [searchPlacesAround, { isLoading }] = placesAroundAPI.useLazyGetPlacesAroundQuery()

    useClickOutside([ref, containerRef], () => {
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

        if (!settings) {
            return
        }

        const response = await searchPlacesAround({
            ...popupInfo.coordinates,
            radius: settings.radii.uniquePlace,
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
                    <div>Selected location</div>
                    <div className="text-small text-black-40 mb-4">{LngLatToString(popupInfo.coordinates)}</div>
                    {settings?.switchers.add_places && (
                        <FormButton type="stroke" size="small" isLoading={isLoading} onClick={handleAddPlaceClick}>
                            Add place here
                        </FormButton>
                    )}
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
