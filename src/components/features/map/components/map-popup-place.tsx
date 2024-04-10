import { Popup } from 'react-map-gl'

import Link from 'next/link'

import type { IPlacePopupInfo } from '@/utils/types/map'

import { PlacePreviewActions } from '@/components/ui/place-preview-actions'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'

export const MapPopupPlace = (place: IPlacePopupInfo) => {
    return (
        <Popup
            latitude={place.coordinates[1]}
            longitude={place.coordinates[0]}
            offset={[0, -5] as [number, number]}
            closeOnClick={false}
            closeButton={false}
        >
            <div className="flex w-56 flex-col gap-y-4">
                <Link href={`/places/${place.id}`} target="_blank" className="link-black flex gap-x-4">
                    <PlacePreviewCover
                        cover={place.cover}
                        title={place.title}
                        size={80}
                        className="aspect-square w-20 rounded-lg"
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
