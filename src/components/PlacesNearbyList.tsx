import Image from 'next/image'
import Link from 'next/link'

import type { IPlaceNearby } from '@/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

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
                        <div className="line-clamp-2">
                            <Link href={`/places/${place.id}`} className="flex-none font-medium">
                                {place.title}
                            </Link>
                        </div>
                        <div className=" text-black-40">{place.distance} m.</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
