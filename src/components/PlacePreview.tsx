import Image from 'next/image'
import Link from 'next/link'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { IPlacePreview } from '@/utils/interfaces'

type PlacePreviewProps = IPlacePreview

export const PlacePreview = ({ id, title, avgRating, reviewsCount, cover }: IPlacePreview) => {
    return (
        <div className="flex flex-row gap-4">
            <Link href={`/places/${id}`} className="flex-none">
                <Image
                    src={makeImageUrl(cover, ImageVariant.PREVIEW)}
                    className="rounded-2xl"
                    width={160}
                    height={160}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
                    alt={title}
                />
            </Link>
            <div>
                <div className="line-clamp-4 text-lg font-medium">
                    <Link href={`/places/${id}`}>{title}</Link>
                </div>
            </div>
        </div>
    )
}
