import Image from 'next/image'
import Link from 'next/link'

import { IPlacePreview } from '@/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type PlaceType = IPlacePreview

export const Place = ({ id, title, cover }: PlaceType) => {
    return (
        <Link href={`/places/${id}`}>
            <Image
                src={makeImageUrl(cover, ImageVariant.PREVIEW)}
                alt={title}
                width={192}
                height={192}
                className="rounded-lg phone:w-full mb-2"
            />
            <span className="text-sm font-medium">{title}</span>
        </Link>
    )
}
