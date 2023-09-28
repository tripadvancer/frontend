import Image from 'next/image'
import Link from 'next/link'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { IPlaceNearby } from '@/utils/interfaces'

type PlacesNearbyListProps = {
    places: IPlaceNearby[]
}

export const PlacesNearbyList = ({ places }: PlacesNearbyListProps) => {
    return (
        <div className="flex flex-col gap-4">
            {places.map(place => (
                <div key={place.id} className="flex flex-row gap-4">
                    <Link href={`/places/${place.id}`} className="flex-none">
                        <Image
                            src={makeImageUrl(place.cover, ImageVariant.PREVIEW)}
                            className="rounded-lg"
                            width={80}
                            height={80}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
                            alt={place.title}
                        />
                    </Link>
                    <div>
                        <div className="line-clamp-2 text-sm font-medium">
                            <Link href={`/places/${place.id}`} className="flex-none">
                                {place.title}
                            </Link>
                        </div>
                        <div className="text-xs text-custom-black-40">{place.distance} m.</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
