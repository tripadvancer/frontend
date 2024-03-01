'use client'

import { Marker, Popup } from 'react-map-gl'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { ILocationPreview } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { closePopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { useSessionValidation } from '@/utils/hooks/use-session-validation'

export const MapPopupLocation = ({ coordinates }: ILocationPreview) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const wrappedCoordinates = coordinates.wrap()
    // Round coordinates to 6 decimal places to avoid floating point errors
    wrappedCoordinates.lat = Number(wrappedCoordinates.lat.toFixed(6))
    wrappedCoordinates.lng = Number(wrappedCoordinates.lng.toFixed(6))

    const handleClick = useSessionValidation(() => {
        dispatch(closePopups())
        router.push(`/add-place?lat=${wrappedCoordinates.lat}&lng=${wrappedCoordinates.lng}`)
    })

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
