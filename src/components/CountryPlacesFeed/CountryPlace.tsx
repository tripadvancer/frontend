import Image from 'next/image'
import Link from 'next/link'

import type { IPlacePreview } from '@/types/place'

import { ImageNotFound } from '@/components/ImageNotFound'
import { Rating } from '@/components/Rating'
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
                            className="xl:w-40 w-32 rounded-2xl"
                            alt={title}
                        />
                    ) : (
                        <ImageNotFound className="xl:w-40 w-32 rounded-2xl" />
                    )}
                </div>
                <div className="flex flex-col justify-between">
                    <div className="text-h7-m sm:text-h7 line-clamp-3">{title}</div>
                    <div>
                        <Rating rating={avgRating} />
                        <div className="text-black-40 text-small">345 reviews</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
