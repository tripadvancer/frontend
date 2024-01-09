'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { ImageNotFound } from '@/components/ui/image-not-found'
import { Rating } from '@/components/ui/rating'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

export const Place = ({ id, title, avgRating, reviewsCount, cover }: IPlacePreview) => {
    const t = useI18n()

    return (
        <Link href={`/places/${id}`} className="text-black-100">
            <div className="flex flex-row gap-4">
                <div className="flex-none">
                    {cover ? (
                        <Image
                            src={makeImageUrl(cover, ImageVariant.PREVIEW)}
                            width={160}
                            height={160}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
                            className="w-32 rounded-2xl xl:w-40"
                            alt={title}
                        />
                    ) : (
                        <ImageNotFound className="w-32 rounded-2xl xl:w-40" />
                    )}
                </div>
                <div className="flex flex-col justify-between">
                    <div className="line-clamp-3 text-h7-m sm:text-h7">{title}</div>
                    <div>
                        <Rating value={avgRating ?? 0} size={16} />
                        <div className="text-small text-black-40">
                            {t('place.reviews', {
                                count: reviewsCount ?? 0,
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
