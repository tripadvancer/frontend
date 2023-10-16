import Image from 'next/image'
import Link from 'next/link'

import type { IPlacePreview } from '@/types/place'

import { ImageNotFound } from '@/components/ImageNotFound'
import { Rating } from '@/components/Rating'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type PlacePreviewProps = IPlacePreview

export const PlacePreview = ({ id, title, avgRating, reviewsCount, cover }: PlacePreviewProps) => {
    return (
        <Link href={`/places/${id}`}>
            <div className="flex flex-row gap-4">
                {cover ? (
                    <Image
                        src={makeImageUrl(cover, ImageVariant.PREVIEW)}
                        width={160}
                        height={160}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
                        className="rounded-2xl phone:w-full w-[160px]"
                        alt={title}
                    />
                ) : (
                    <ImageNotFound className="w-[160px] rounded-2xl phone:max-w-full" />
                )}
                <div className="flex flex-col justify-between">
                    <div className="line-clamp-4 text-lg font-medium">
                        <Link href={`/places/${id}`}>{title}</Link>
                    </div>
                    <div>
                        <Rating rating={avgRating} />
                        <div className="text-xs text-custom-black-40">345 reviews</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
