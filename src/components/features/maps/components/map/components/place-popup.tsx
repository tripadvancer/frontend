'use client'

import { Popup } from 'react-map-gl/maplibre'

import Image from 'next/image'
import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

export const PlacePopup = (place: IPlacePreview) => {
    return (
        <Popup
            latitude={place.coordinates[1]}
            longitude={place.coordinates[0]}
            offset={[0, -5] as [number, number]}
            closeOnClick={false}
            closeButton={false}
        >
            <div>
                <Link href={`/places/${place.id}`} target="_blank" className="link-black flex gap-x-4">
                    {place.cover && (
                        <Image
                            src={makeImageUrl(place.cover, ImageVariant.PREVIEW)}
                            width="80"
                            height="80"
                            className="rounded-lg"
                            alt={place.title}
                        />
                    )}
                    <div className="font-medium">{place.title}</div>
                </Link>
            </div>
        </Popup>
    )
}
