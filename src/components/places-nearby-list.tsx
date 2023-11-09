import Image from 'next/image'
import Link from 'next/link'

import type { IPlaceNearby } from '@/utils/types/place'

import { ImageNotFound } from '@/components/image-not-found'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type PlacesNearbyListProps = {
    places: IPlaceNearby[]
}

export const PlacesNearbyList = ({ places }: PlacesNearbyListProps) => {
    return (
        <div className="flex flex-col gap-4">
            {places.map(place => (
                <Link href={`/places/${place.id}`} key={place.id} className="flex-none">
                    <div className="flex flex-row gap-4">
                        {place.cover ? (
                            <Image
                                src={makeImageUrl(place.cover, ImageVariant.PREVIEW)}
                                className="rounded-lg"
                                width={80}
                                height={80}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
                                alt={place.title}
                            />
                        ) : (
                            <ImageNotFound className="w-20 rounded-lg" />
                        )}
                        <div className="flex flex-col justify-between">
                            <div className="line-clamp-2 font-medium">{place.title}</div>
                            <div className="text-small text-black-40">{place.distance} m.</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
