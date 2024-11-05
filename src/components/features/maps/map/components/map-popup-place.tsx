import { RefObject, useRef } from 'react'
import { Popup } from 'react-map-gl/maplibre'

import { useOnClickOutside } from 'usehooks-ts'

import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { closeMapPopups, getMapState } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { arrayToLngLat } from '@/utils/helpers/maps'

import { MapPopupPlaceActions } from './map-popup-place-actions'

type MapPopupPlaceProps = {
    containerRef: RefObject<HTMLDivElement>
}

export const MapPopupPlace = ({ containerRef }: MapPopupPlaceProps) => {
    const dispatch = useAppDispatch()
    const popupInfo = useAppSelector(getMapState).placePopupInfo
    const ref = useRef<HTMLDivElement>(null)

    useOnClickOutside([ref, containerRef], () => {
        dispatch(closeMapPopups())
    })

    if (!popupInfo) {
        return null
    }

    const lngLat = arrayToLngLat(popupInfo.coordinates)

    return (
        <Popup
            latitude={lngLat.lat}
            longitude={lngLat.lng}
            offset={[0, -15] as [number, number]}
            closeOnClick={false}
            closeButton={false}
        >
            <div ref={ref} className="flex w-56 flex-col gap-y-4">
                <Link
                    href={`/places/${popupInfo.id}`}
                    target="_blank"
                    className="link-black flex gap-x-4 focus:outline-none"
                >
                    <PlacePreviewCover
                        cover={popupInfo.cover}
                        title={popupInfo.title}
                        size={80}
                        className="aspect-square w-20 flex-none rounded-lg"
                    />
                    <div className="line-clamp-4 break-words font-medium">{popupInfo.title}</div>
                </Link>
                <div className="flex items-center justify-between">
                    <PlacePreviewRating {...popupInfo} />
                    <MapPopupPlaceActions {...popupInfo} />
                </div>
            </div>
        </Popup>
    )
}
