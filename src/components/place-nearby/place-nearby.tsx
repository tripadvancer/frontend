import Image from 'next/image'
import Link from 'next/link'

import { IPlaceNearby } from '@/utils/types/place'

import { ImageNotFound } from '@/components/image-not-found'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { getI18n } from '@/utils/i18n/i18n.server'

type PlaceNearbyProps = IPlaceNearby

export const PlaceNearby = async (place: PlaceNearbyProps) => {
    const t = await getI18n()

    // Rounding meters to kilometers
    const distance = Math.round(place.distance / 100) / 10

    return (
        <Link href={`/places/${place.id}`} className="flex-none">
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
                    <div className="text-small text-black-40">{t('common.distance.meters', { distance })}</div>
                </div>
            </div>
        </Link>
    )
}
