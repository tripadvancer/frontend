'use client'

import Link from 'next/link'

import type { IPlaceNearby, IPlacePreview } from '@/utils/types/place'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { Rating } from '@/components/ui/rating'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlacesFeedItem = (place: IPlacePreview | IPlaceNearby) => {
    const t = useI18n()

    return (
        <Link href={`/places/${place.id}`} className="text-black-100">
            <div className="flex flex-row gap-4">
                <div className="flex-none">
                    <PlacePreviewCover
                        cover={place.cover}
                        title={place.title}
                        size={160}
                        className="aspect-square w-32 rounded-2xl xl:w-40"
                    />
                </div>
                <div className="flex flex-col justify-between overflow-hidden">
                    <div className="h7 line-clamp-4 break-words">{place.title}</div>
                    <div>
                        <Rating value={place.avgRating ?? 0} size={16} />
                        <div className="text-small text-black-40">
                            {t('place.reviews', {
                                count: place.reviewsCount ?? 0,
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
