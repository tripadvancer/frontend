import { RefObject, useRef } from 'react'
import { Marker, Popup } from 'react-map-gl/maplibre'

import { useOnClickOutside } from 'usehooks-ts'

import Image from 'next/image'
import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { getPlacePath } from '@/utils/helpers/places'
import { closeMapPopups, getMapState } from '@/utils/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

import { MapPopupPlaceActions } from './map-popup-place-actions'

type MapPopupPlaceProps = {
    containerRef: RefObject<HTMLDivElement>
}

export const MapPopupPlace = ({ containerRef }: MapPopupPlaceProps) => {
    const dispatch = useAppDispatch()
    const popupInfo = useAppSelector(getMapState).placePopupInfo
    const ref = useRef<HTMLDivElement>(null)

    // TODO: Consider switching to a different package or waiting for a fix
    // Issue: `useOnClickOutside` does not support a `null` ref
    // More details: https://github.com/juliencrn/usehooks-ts/issues/663
    useOnClickOutside([ref as RefObject<HTMLDivElement>, containerRef], () => {
        dispatch(closeMapPopups())
    })

    if (!popupInfo) {
        return null
    }

    const lngLat = arrayToLngLat(popupInfo.coordinates)

    return (
        <>
            <Marker longitude={lngLat.lng} latitude={lngLat.lat} anchor="bottom">
                <Image src="/images/pin-blue-active.svg" alt="Place marker" width={27} height={41} />
            </Marker>
            <Popup
                latitude={lngLat.lat}
                longitude={lngLat.lng}
                offset={[0, -15] as [number, number]}
                closeOnClick={false}
                closeButton={false}
            >
                <div ref={ref} className="flex w-56 flex-col gap-y-4">
                    <Link
                        href={getPlacePath(popupInfo.id, popupInfo.countryCode)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-black flex gap-x-4 focus:outline-none"
                    >
                        <PlacePreviewCover
                            cover={popupInfo.cover}
                            title={popupInfo.title}
                            size={80}
                            className="aspect-square w-20 flex-none rounded-lg"
                        />
                        <div className="line-clamp-4 font-medium wrap-break-word">{popupInfo.title}</div>
                    </Link>
                    <div className="flex items-center justify-between">
                        <PlacePreviewRating {...popupInfo} />
                        <MapPopupPlaceActions {...popupInfo} />
                    </div>
                </div>
            </Popup>
        </>
    )
}
