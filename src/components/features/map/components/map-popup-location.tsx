'use client'

import { Marker, Popup } from 'react-map-gl'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { ILocationPreview } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { closeMapPopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { useSessionValidation } from '@/utils/hooks/use-session-validation'
import { useI18n } from '@/utils/i18n/i18n.client'

export const MapPopupLocation = ({ coordinates }: ILocationPreview) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const router = useRouter()

    // check if wrap is a function
    // todo
    if (typeof coordinates.wrap !== 'function') {
        dispatch(closeMapPopups())
    }

    const wrappedCoordinates = coordinates.wrap()
    // Round coordinates to 6 decimal places
    wrappedCoordinates.lat = Number(wrappedCoordinates.lat.toFixed(6))
    wrappedCoordinates.lng = Number(wrappedCoordinates.lng.toFixed(6))

    const handleClick = useSessionValidation(() => {
        dispatch(closeMapPopups())
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
                <div>{t('map.popup.location.title')}</div>
                <div className="mb-4 text-small text-black-40">
                    {wrappedCoordinates.lat}, {wrappedCoordinates.lng}
                </div>
                <FormButton type="stroke" size="small" onClick={handleClick}>
                    {t('map.popup.location.add_place')}
                </FormButton>
            </Popup>
            <Marker latitude={coordinates.lat} longitude={coordinates.lng}>
                <Image src="/images/pin-blue-active.svg" alt="Location marker" width={20} height={20} />
            </Marker>
        </>
    )
}
