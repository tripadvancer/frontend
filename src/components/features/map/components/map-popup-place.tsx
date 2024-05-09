import { RefObject, useRef } from 'react'
import { Popup } from 'react-map-gl/maplibre'

import { useOnClickOutside } from 'usehooks-ts'

import Link from 'next/link'

import type { IPlacePopupInfo } from '@/utils/types/map'

import { PlacePreviewActions } from '@/components/ui/place-preview-actions'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { closeMapPopups } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'
import { arrayToLngLat } from '@/utils/helpers/maps'

type MapPopupPlaceProps = {
    mapRef: RefObject<HTMLDivElement>
    place: IPlacePopupInfo
}

export const MapPopupPlace = ({ mapRef, place }: MapPopupPlaceProps) => {
    const dispatch = useAppDispatch()
    const lngLat = arrayToLngLat(place.coordinates)

    const ref = useRef<HTMLDivElement>(null)

    useOnClickOutside([ref, mapRef], () => {
        dispatch(closeMapPopups())
    })

    return (
        <Popup
            latitude={lngLat.lat}
            longitude={lngLat.lng}
            offset={[0, -5] as [number, number]}
            closeOnClick={false}
            closeButton={false}
        >
            <div ref={ref} className="flex w-56 flex-col gap-y-4">
                <Link href={`/places/${place.id}`} target="_blank" className="link-black flex gap-x-4">
                    <PlacePreviewCover
                        cover={place.cover}
                        title={place.title}
                        size={80}
                        className="aspect-square w-20 flex-none rounded-lg"
                    />
                    <div className="line-clamp-4 break-words font-medium">{place.title}</div>
                </Link>
                <div className="flex items-center justify-between">
                    <PlacePreviewRating {...place} />
                    <PlacePreviewActions {...place} />
                </div>
            </div>
        </Popup>
    )
}
