import Image from 'next/image'
import Link from 'next/link'

import type { IPlacePreview } from '@/types/place'

import { ImageNotFound } from '@/components/image-not-found'
import { Rating } from '@/components/rating'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type CountryPlaceProps = IPlacePreview

export const CountryPlace = ({ id, title, avgRating, reviewsCount, cover }: CountryPlaceProps) => {
    return (
        <Link href={`/places/${id}`}>
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
                        <Rating rating={avgRating} />
                        <div className="text-small text-black-40">345 reviews</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
