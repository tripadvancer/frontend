'use client'

import { Marker, Popup } from 'react-map-gl'

import Session from 'supertokens-web-js/recipe/session'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { ILocationPreview } from '@/utils/types/place'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { closePopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'

export const LocationPopup = ({ coordinates }: ILocationPreview) => {
    const dispatch = useAppDispatch()
    const dialog = useDialog()
    const router = useRouter()

    const wrappedCoordinates = coordinates.wrap()
    // Round coordinates to 6 decimal places to avoid floating point errors
    wrappedCoordinates.lat = Number(wrappedCoordinates.lat.toFixed(6))
    wrappedCoordinates.lng = Number(wrappedCoordinates.lng.toFixed(6))

    const handleClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        // todo: create helper for get claim value on client and server
        const validationErrors = await Session.validateClaims()
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const userId = accessTokenPayload.userId
        const hasClaims = validationErrors.length > 0

        if (hasClaims) {
            dialog.open(<ClaimEmailError userId={userId} />)
            return
        }

        const addPlaceUrl = '/add-place?lat=' + wrappedCoordinates.lat + '&lng=' + wrappedCoordinates.lng
        dispatch(closePopups())
        router.push(addPlaceUrl)
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
                <div>Selected location</div>
                <div className="mb-4 text-small text-black-40">
                    {wrappedCoordinates.lat}, {wrappedCoordinates.lng}
                </div>
                <FormButton type="stroke" size="small" onClick={handleClick}>
                    Add place here
                </FormButton>
            </Popup>
            <Marker latitude={coordinates.lat} longitude={coordinates.lng}>
                <Image src="/images/pin-blue-active.svg" alt="Location marker" width={20} height={20} />
            </Marker>
        </>
    )
}
