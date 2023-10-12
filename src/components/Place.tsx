import Image from 'next/image'
import Link from 'next/link'

import { IPlacePreview } from '@/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

import { ImageNotFound } from './ImageNotFound'

type PlaceType = IPlacePreview

export const Place = ({ id, title, cover }: PlaceType) => {
    return (
        <Link href={`/places/${id}`}>
            <div className="mb-2">
                {cover ? (
                    <Image
                        src={makeImageUrl(cover, ImageVariant.PREVIEW)}
                        alt={title}
                        width={192}
                        height={192}
                        className="mb-2 rounded-lg phone:w-full"
                    />
                ) : (
                    <ImageNotFound />
                )}
            </div>
            <span className="text-sm font-medium">{title}</span>
        </Link>
    )
}
