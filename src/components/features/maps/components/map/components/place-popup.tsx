import Image from 'next/image'
import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

export const PlacePopup = (place: IPlacePreview) => {
    return (
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
                <div className="font-bold">{place.title}</div>
            </Link>
        </div>
    )
}
