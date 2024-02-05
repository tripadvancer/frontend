'use client'

import { Marker, Popup } from 'react-map-gl/maplibre'

import Session from 'supertokens-web-js/recipe/session'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { ILocationPreview } from '@/utils/types/place'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { FormButtonStroke } from '@/components/ui/form-button-stroke'
import { useDialog } from '@/providers/dialog-provider'

export const LocationPopup = (location: ILocationPreview) => {
    const dialog = useDialog()
    const router = useRouter()
    const latitude = Number(location.coordinates[0].toFixed(6))
    const longitude = Number(location.coordinates[1].toFixed(6))

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

        const addPlaceUrl = '/add-place?lat=' + latitude + '&lng=' + longitude
        router.push(addPlaceUrl)
    }

    return (
        <>
            <Popup
                latitude={location.coordinates[0]}
                longitude={location.coordinates[1]}
                offset={[0, -5] as [number, number]}
                closeOnClick={false}
                closeButton={false}
            >
                <div>Selected location</div>
                <div className="mb-4 text-small text-black-40">
                    {latitude}, {longitude}
                </div>
                <FormButtonStroke size="small" variant="blue" onClick={handleClick}>
                    Add place here
                </FormButtonStroke>
            </Popup>
            <Marker latitude={latitude} longitude={longitude}>
                <Image src="/images/pin-blue.svg" alt="Location marker" width={20} height={20} />
            </Marker>
        </>
    )
}
